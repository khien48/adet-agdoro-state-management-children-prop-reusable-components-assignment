import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Moon, Sun } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: isDark ? '#2D3748' : '#E2E8F0' }
      ]}
      onPress={toggleTheme}
    >
      {isDark ? (
        <Moon size={20} color="#FFFFFF" />
      ) : (
        <Sun size={20} color="#000000" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 20,
    marginLeft: 'auto',
  },
});