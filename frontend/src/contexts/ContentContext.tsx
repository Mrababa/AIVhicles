import React, { createContext, ReactNode } from 'react';

interface ContentData {
  headline: string;
  tagline: string;
  dataStreamHeadline: string;
  dataStreamDescription: string;
}

const defaultContent: ContentData = {
  headline: 'Unlock intelligence in your vehicle data',
  tagline: 'Vehicle insights, automation and AI tooling all in one platform.',
  dataStreamHeadline: 'The Data Engine',
  dataStreamDescription:
    'Our infrastructure is built to deliver real-time, accurate vehicle information at scale.',
};

export const ContentContext = createContext<ContentData>(defaultContent);

export function ContentProvider({ children }: { children: ReactNode }) {
  return (
    <ContentContext.Provider value={defaultContent}>
      {children}
    </ContentContext.Provider>
  );
}

