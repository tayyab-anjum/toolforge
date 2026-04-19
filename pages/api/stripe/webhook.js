// pages/api/stripe/webhook.js
// Listens to Stripe events — activates/cancels user subscriptions automatically

import Stripe from 'stripe';
import { buffer } from 'micro';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const buf = await buffer(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: 'Invalid webhook signature' });
  }

  await dbConnect();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const email = session.customer_email;
      const plan = session.metadata?.plan;
      if (email && plan) {
        await User.findOneAndUpdate(
          { email },
          { subscriptionPlan: plan, subscriptionStatus: 'active', stripeCustomerId: session.customer },
          { upsert: true }
        );
      }
      break;
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object;
      await User.findOneAndUpdate(
        { stripeCustomerId: invoice.customer },
        { subscriptionStatus: 'active', lastPayment: new Date() }
      );
      break;
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object;
      await User.findOneAndUpdate(
        { stripeCustomerId: sub.customer },
        { subscriptionStatus: 'cancelled', subscriptionPlan: 'free' }
      );
      break;
    }

    default:
      break;
  }

  return res.status(200).json({ received: true });
}
