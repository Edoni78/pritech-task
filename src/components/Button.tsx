import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { colors } from '../constants/colors';

type ButtonVariant = 'primary' | 'outline' | 'danger';

// Override `style` to only accept a plain ViewStyle, not a style callback.
// This keeps the prop simpler for a leaf button component.
type ButtonProps = Omit<PressableProps, 'style'> & {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
  style?: ViewStyle;
};

type VariantStyle = {
  container: ViewStyle;
  text: TextStyle;
  pressed: ViewStyle;
  disabled: ViewStyle;
};

const variantStyles: Record<ButtonVariant, VariantStyle> = {
  primary: {
    container: { backgroundColor: colors.primary },
    text: { color: colors.surface },
    pressed: { backgroundColor: colors.primaryDark },
    disabled: { backgroundColor: colors.primaryDisabled },
  },
  outline: {
    container: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    text: { color: colors.text },
    pressed: { backgroundColor: colors.background },
    disabled: { backgroundColor: colors.background },
  },
  danger: {
    container: {
      backgroundColor: colors.dangerLight,
      borderWidth: 1,
      borderColor: colors.dangerBorder,
    },
    text: { color: colors.danger },
    pressed: { backgroundColor: colors.dangerPressed },
    disabled: { backgroundColor: colors.background },
  },
};

export function Button({
  label,
  variant = 'primary',
  loading = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const variantStyle = variantStyles[variant];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        baseStyles.button,
        variantStyle.container,
        pressed && !isDisabled && variantStyle.pressed,
        isDisabled && variantStyle.disabled,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.surface : colors.primary} />
      ) : (
        <Text style={[baseStyles.label, variantStyle.text, isDisabled && baseStyles.disabledText]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const baseStyles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabledText: {
    opacity: 0.7,
  },
});
