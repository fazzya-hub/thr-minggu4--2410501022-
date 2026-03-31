import { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function HeaderAction() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.btn} activeOpacity={0.85}>
      <Text style={styles.text}>{isDarkMode ? 'Light' : 'Dark'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  text: {
    color: '#fff',
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});

