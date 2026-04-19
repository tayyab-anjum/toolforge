// pages/api/auth/me.js
import { requireAuth } from '../../../lib/authMiddleware';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const user = await requireAuth(req, res);
  if (!user) return;

  return res.status(200).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      plan: user.subscriptionPlan,
      creditsUsed: user.creditsUsed,
      creditsLimit: user.creditsLimit,
    },
  });
}
