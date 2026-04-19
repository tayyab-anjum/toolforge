// pages/api/auth/signup.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_IDS = {
  starter: process.env.STRIPE_PRICE_STARTER,
  pro: process.env.STRIPE_PRICE_PRO,
  agency: process.env.STRIPE_PRICE_AGENCY,
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, password, plan = 'free' } = req.body;

  if (!email || !password || !name) return res.status(400).json({ error: 'Name, email, and password are required' });
  if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

  await dbConnect();

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return res.status(400).json({ error: 'An account with this email already exists' });

  const hashed = await bcrypt.hash(password, 12);
  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hashed,
    subscriptionPlan: 'free',
    subscriptionStatus: 'active',
    creditsUsed: 0,
    creditsLimit: 10,
  });

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

  const userData = {
    id: user._id,
    name: user.name,
    email: user.email,
    plan: user.subscriptionPlan,
    creditsUsed: user.creditsUsed,
    creditsLimit: user.creditsLimit,
  };

  // If paid plan, create Stripe checkout
  let checkoutUrl = null;
  if (plan !== 'free' && PRICE_IDS[plan]) {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [{ price: PRICE_IDS[plan], quantity: 1 }],
        customer_email: user.email,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/app?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?cancelled=true`,
        metadata: { plan, userId: user._id.toString() },
      });
      checkoutUrl = session.url;
    } catch (e) {
      console.error('Stripe checkout creation failed:', e.message);
    }
  }

  return res.status(201).json({ token, user: userData, checkoutUrl });
}
