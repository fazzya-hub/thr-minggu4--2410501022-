import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = '@task_habit_tracker_theme_v1';

export const ThemeContext = createContext(null);

const palette = {
  emerald: '#10B981',
  emeraldDark: '#059669',
  slate950: '#020617',
  slate900: '#0F172A',
  slate800: '#1E293B',
  slate200: '#E2E8F0',
  slate100: '#F1F5F9',
  white: '#FFFFFF',
  red: '#EF4444',
};

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    async function loadTheme() {
      try {
        const saved = await AsyncStorage.getItem(THEME_KEY);
        if (saved !== null) setIsDarkMode(saved === 'dark');
      } catch (e) {
        console.warn('Gagal memuat tema:', e);
      } finally {
        setThemeReady(true);
      }
    }
    loadTheme();
  }, []);

  async function toggleTheme() {
    const next = !isDarkMode;
    setIsDarkMode(next);
    try {
      await AsyncStorage.setItem(THEME_KEY, next ? 'dark' : 'light');
    } catch (e) {
      console.warn('Gagal menyimpan tema:', e);
    }
  }

  const colors = {
    brand: palette.emerald,
    brand2: palette.emeraldDark,
    bg: isDarkMode ? palette.slate950 : '#ECFDF5',
    card: isDarkMode ? palette.slate900 : palette.white,
    border: isDarkMode ? palette.slate800 : '#A7F3D0',
    text: isDarkMode ? palette.slate100 : '#0F172A',
    muted: isDarkMode ? palette.slate200 : '#334155',
    danger: palette.red,
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, colors, toggleTheme, themeReady }}>
      {children}
    </ThemeContext.Provider>
  );
}
