import stripe from "stripe";

export const Stripe = new stripe(process.env.STRIPE_SECRET);
