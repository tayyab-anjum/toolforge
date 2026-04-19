// lib/authMiddleware.js
// Call this at the top of any protected API route
import jwt from 'jsonwebtoken';
import dbConnect from './dbConnect';
import User from '../models/User';

export async function requireAuth(req, res) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Not authenticated' });
    return null;
  }

  const token = auth.split(' ')[1];
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
    return null;
  }

  await dbConnect();
  const user = await User.findById(payload.userId);
  if (!user) {
    res.status(401).json({ error: 'User not found' });
    return null;
  }

  return user;
}
