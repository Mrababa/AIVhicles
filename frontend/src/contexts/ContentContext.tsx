import React, { createContext, ReactNode } from 'react';

interface ContentData {
  headline: string;
  tagline: string;
}

const defaultContent: ContentData = {
  headline: 'Unlock intelligence in your vehicle data',
  tagline: 'Vehicle insights, automation and AI tooling all in one platform.',
};

export const ContentContext = createContext<ContentData>(defaultContent);

export function ContentProvider({ children }: { children: ReactNode }) {
  return (
    <ContentContext.Provider value={defaultContent}>
      {children}
    </ContentContext.Provider>
  );
}

