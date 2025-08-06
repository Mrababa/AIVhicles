export const MAKES = [
  'Toyota',
  'Honda',
  'Nissan',
  'Ford',
  'Chevrolet',
];

export const YEARS = Array.from({ length: 35 }, (_, i) => 2024 - i);

export const CATEGORIES = [
  'Sedan',
  'SUV',
  'Truck',
  'Coupe',
  'Convertible',
];

// Pricing plans used on the Pricing page
export const PRICING_PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Essential tools for side projects and small teams.',
    price: '$29',
    features: ['VIN decoding', 'Basic analytics', 'Email support'],
    ctaLabel: 'Get started',
    ctaLink: '/signup',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Advanced features for growing businesses.',
    price: '$99',
    features: ['Everything in Basic', 'Damage estimator', 'Priority support'],
    popular: true,
    ctaLabel: 'Start trial',
    ctaLink: '/signup',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom solutions for large organizations.',
    price: 'Custom',
    features: ['Unlimited access', 'Dedicated success manager', 'Custom integrations'],
    ctaLabel: 'Contact sales',
    ctaLink: '/contact',
  },
];

// Feature comparison table values keyed by plan id
export const PRICING_FEATURES = [
  {
    feature: 'VIN decodes per month',
    basic: '500',
    pro: '5,000',
    enterprise: 'Unlimited',
  },
  {
    feature: 'Damage reports',
    basic: '50',
    pro: '500',
    enterprise: 'Unlimited',
  },
  {
    feature: 'Team members',
    basic: '1',
    pro: '5',
    enterprise: 'Unlimited',
  },
  {
    feature: 'Priority support',
    basic: false,
    pro: true,
    enterprise: true,
  },
  {
    feature: 'Custom integrations',
    basic: false,
    pro: false,
    enterprise: true,
  },
];
