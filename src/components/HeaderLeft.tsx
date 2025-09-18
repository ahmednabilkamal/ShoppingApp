import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface HeaderLeftProps {
  onPress: () => void;
  isDarkMode: boolean;
}

const HeaderLeft: React.FC<HeaderLeftProps> = ({ onPress, isDarkMode }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Text style={styles.iconText}>{isDarkMode ? '🌞' : '🌙'}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
  },
  iconText: {
    fontSize: 20,
  },
});

export default HeaderLeft;
