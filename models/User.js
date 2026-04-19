// models/User.js
// MongoDB schema for users — stores auth, subscription, and usage data

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }, // bcrypt hashed
    name: { type: String, trim: true },
    stripeCustomerId: { type: String },
    subscriptionPlan: { type: String, enum: ['free', 'starter', 'pro', 'agency'], default: 'free' },
    subscriptionStatus: { type: String, enum: ['active', 'cancelled', 'trialing', 'past_due'], default: 'active' },
    lastPayment: { type: Date },
    creditsUsed: { type: Number, default: 0 },
    creditsLimit: { type: Number, default: 10 }, // free tier gets 10 generations
  },
  { timestamps: true }
);

// Credit limits per plan
UserSchema.methods.getCreditsLimit = function () {
  const limits = { free: 10, starter: 100, pro: 500, agency: Infinity };
  return limits[this.subscriptionPlan] ?? 10;
};

UserSchema.methods.hasCredits = function () {
  return this.creditsUsed < this.getCreditsLimit();
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
