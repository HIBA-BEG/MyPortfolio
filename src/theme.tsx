import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  motionPaused: boolean;
  toggleMotion: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

// localStorage keys: "theme" (dark|light) and "stars-motion" (on|off)
// index.html applies the theme before react, so this just has to match it
function readTheme(): Theme {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // private window
  }
  return 'dark';
}

function readMotionPaused() {
  try {
    const saved = localStorage.getItem('stars-motion');
    if (saved === 'off') return true;
    if (saved === 'on') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readTheme);
  const [motionPaused, setMotionPaused] = useState(readMotionPaused);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.motion = motionPaused ? 'paused' : 'running';
    localStorage.setItem('stars-motion', motionPaused ? 'off' : 'on');
  }, [motionPaused]);

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  const toggleMotion = () => setMotionPaused((current) => !current);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, motionPaused, toggleMotion }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme must be used within ThemeProvider');
  return value;
}
