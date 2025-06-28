// components/StripeElementsProvider.jsx
"use client"

import { Elements } from '@stripe/stripe-react';
import { loadStripe } from '@stripe/stripe-js';

/**
 * Provider component that wraps children with Stripe Elements context
 * @param {ReactNode} children - Child components that need Stripe access
 */
const StripeElementsProvider = ({ children }) => {
  const stripePromise = loadStripe(import.meta.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeElementsProvider;