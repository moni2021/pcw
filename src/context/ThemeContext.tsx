
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Theme = 'default' | 'arena' | 'nexa';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('default');

  useEffect(() => {
    // Ensure the dark class is always present
    document.documentElement.classList.add('dark');
    
    // Remove specific theme classes before adding the new one
    document.documentElement.classList.remove('theme-arena', 'theme-nexa');
    
    // Add the current theme class if it's not the default
    if (theme !== 'default') {
      document.documentElement.classList.add(`theme-${theme}`);
    }
  }, [theme]);


  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
