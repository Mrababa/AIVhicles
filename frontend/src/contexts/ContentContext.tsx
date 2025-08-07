import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

interface ContentData {
  headline: string;
  tagline: string;
  dataStreamHeadline: string;
  dataStreamDescription: string;
  pricingTiers: PricingTier[];
}

interface ContentContextValue {
  content: ContentData;
  setContent: (data: ContentData) => void;
}

const defaultContent: ContentData = {
  headline: 'Unlock intelligence in your vehicle data',
  tagline: 'Vehicle insights, automation and AI tooling all in one platform.',
  dataStreamHeadline: 'The Data Engine',
  dataStreamDescription:
    'Our infrastructure is built to deliver real-time, accurate vehicle information at scale.',
  pricingTiers: [
    {
      name: 'Free',
      price: '$0',
      description: 'Essential tools to get started',
      features: ['Basic feature set'],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$49',
      description: 'Advanced features for professionals',
      features: ['Everything in Free', 'Advanced analytics', 'Priority support'],
      cta: 'Upgrade',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Tailored solutions for large teams',
      features: ['Custom features', 'Dedicated support'],
      cta: 'Contact Sales',
      popular: false,
    },
  ],
};

export const ContentContext = createContext<ContentContextValue>({
  content: defaultContent,
  setContent: () => {},
});

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<ContentData>(() => {
    const stored = localStorage.getItem('content');
    return stored ? JSON.parse(stored) : defaultContent;
  });

  const setContent = (data: ContentData) => {
    setContentState(data);
    localStorage.setItem('content', JSON.stringify(data));
  };

  useEffect(() => {
    localStorage.setItem('content', JSON.stringify(content));
  }, [content]);

  return (
    <ContentContext.Provider value={{ content, setContent }}>
      {children}
    </ContentContext.Provider>
  );
}

