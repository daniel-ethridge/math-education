import { createContext, useContext, useState } from 'react';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: typeof darkTheme;
};

export const darkTheme = {
  background: '#25292e',
  surface: '#333',
  primary: '#007AFF',
  text: '#fff',
  textSecondary: '#999',
  inputBackground: '#444',
};

export const lightTheme = {
  background: '#f5f5f5',
  surface: '#ffffff',
  primary: '#007AFF',
  text: '#000000',
  textSecondary: '#666666',
  inputBackground: '#eeeeee',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
