import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LayoutContextType {
  navbarHeight: number;
  setNavbarHeight: (height: number) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [navbarHeight, setNavbarHeight] = useState(0);

  return (
    <LayoutContext.Provider value={{ navbarHeight, setNavbarHeight }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within LayoutProvider');
  }
  return context;
};
