import React, { createContext, useState, ReactNode } from 'react';

 type Theme = {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
  colors: {
    light: {
      background: string;
      text: string;
      contenct: {
        background: string;
        color: string;
        borderColor:string;
      };
    };
    dark: {
      background: string;
      text: string;
      contenct: {
        background: string;
        borderColor: string;
        color: string;
      };
    };
  };
};

type ThemeContextType = {
  theme: Theme;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export default function Context({children}:ThemeProviderProps)  {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  const toggleThemeMode = () => {
    setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme: Theme = {
    mode: themeMode,
    toggleTheme: toggleThemeMode,
    colors: {
      light: {
        background: '#F7F7F7',
        text: 'black',
        contenct: {
          background: '#F0F4FF',
          color: '#708090',
          borderColor:""
        },
      },
      dark: {
        background: 'black',
        text: 'white',
        contenct: {
          background: '#000',
          borderColor: 'white',
          color: 'white',
        },
      },
    },
  };

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
