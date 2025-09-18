import React, { createContext, useState, useEffect } from 'react';
import { MMKV } from 'react-native-mmkv';
import { Appearance } from 'react-native';

const storage = new MMKV();
export const ThemeContext = createContext<{
  theme: string;
  toggleTheme: () => void;
} | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(storage.getString('theme') || colorScheme);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    storage.set('theme', newTheme);
  };

  useEffect(() => {
    const storedTheme = storage.getString('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const value = { theme: theme!, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
