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

interface Feature {
  title: string;
  description: string;
}

interface TeamMember {
  name: string;
  title: string;
  imageUrl: string;
}

interface LegalSection {
  title: string;
  content: string;
}

interface ContentData {
  headline: string;
  tagline: string;
  dataStreamHeadline: string;
  dataStreamDescription: string;
  pricingTiers: PricingTier[];
  features: Feature[];
  about: {
    intro: string;
    mission: string;
    leadership: string;
    team: TeamMember[];
  };
  contact: {
    intro: string;
    address: string;
    email: string;
    phone: string;
    mapUrl: string;
  };
  careers: {
    intro: string;
  };
  legal: {
    sections: LegalSection[];
  };
}

interface ContentContextValue extends ContentData {
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
  features: [
    {
      title: 'VIN Decoding',
      description: 'Instantly decode and understand any vehicle by its VIN.',
    },
    {
      title: 'Damage Estimator',
      description: 'AI-powered estimates for repair costs from images.',
    },
    {
      title: 'Valuation',
      description: 'Real-time market pricing backed by live data.',
    },
  ],
  about: {
    intro:
      'VehiclesData empowers developers and enthusiasts with modern tools and insights to understand vehicle information more effectively.',
    mission:
      'Our mission is to make comprehensive vehicle data accessible and actionable for everyone.',
    leadership: 'Meet the dedicated team steering the vision of VehiclesData.',
    team: [
      {
        name: 'Alex Carter',
        title: 'Founder & CEO',
        imageUrl: 'https://i.pravatar.cc/150?img=1',
      },
      {
        name: 'Jamie Smith',
        title: 'CTO',
        imageUrl: 'https://i.pravatar.cc/150?img=2',
      },
    ],
  },
  contact: {
    intro:
      'We would love to hear from you. Reach out to us using the information below.',
    address: '123 Main St, Springfield, USA',
    email: 'support@example.com',
    phone: '+1 (555) 123-4567',
    mapUrl: 'https://maps.google.com',
  },
  careers: {
    intro: 'Interested in joining our team? Check back soon for open positions.',
  },
  legal: {
    sections: [
      {
        title: 'Introduction',
        content: 'This is a sample legal section.',
      },
    ],
  },
};

export const ContentContext = createContext<ContentContextValue>({
  ...defaultContent,
  content: defaultContent,
  setContent: () => {},
});

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<ContentData>(() => {
    const stored = localStorage.getItem('content');
    if (!stored) {
      return defaultContent;
    }

    const parsed = JSON.parse(stored);
    return {
      ...defaultContent,
      ...parsed,
      features: parsed.features || defaultContent.features,
      about: {
        ...defaultContent.about,
        ...parsed.about,
        team: parsed.about?.team || defaultContent.about.team,
      },
      contact: {
        ...defaultContent.contact,
        ...parsed.contact,
      },
      careers: {
        ...defaultContent.careers,
        ...parsed.careers,
      },
      legal: {
        ...defaultContent.legal,
        ...parsed.legal,
        sections: parsed.legal?.sections || defaultContent.legal.sections,
      },
    };
  });

  const setContent = (data: ContentData) => {
    setContentState(data);
    localStorage.setItem('content', JSON.stringify(data));
  };

  useEffect(() => {
    localStorage.setItem('content', JSON.stringify(content));
  }, [content]);

  return (
    <ContentContext.Provider value={{ ...content, content, setContent }}>
      {children}
    </ContentContext.Provider>
  );
}

