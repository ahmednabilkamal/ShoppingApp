import React, { useContext } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { ThemeContext } from '../themes/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
}) => {
  const { theme } = useContext(ThemeContext)!;
  const isDarkMode = theme === 'dark';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isDarkMode ? styles.darkButton : styles.lightButton,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.buttonText,
          isDarkMode ? styles.darkButtonText : styles.lightButtonText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  lightButton: {
    backgroundColor: '#007bff',
  },
  darkButton: {
    backgroundColor: '#1e88e5',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lightButtonText: {
    color: '#fff',
  },
  darkButtonText: {
    color: '#fff',
  },
});

export default Button;
