import { FontAwesome } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';

const IconButton = ({ icon, color, size, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
      testID="icon-button"
    >
      <FontAwesome name={icon} color={color} size={size} testID="icon" />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    margin: 8,
  },
  pressed: {
    opacity: 0.7,
  },
});
