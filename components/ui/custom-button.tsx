import { useThemeColor } from "@/hooks/useThemeColor";
import { PressableProps, StyleSheet, Pressable, Text } from "react-native";

type Props = PressableProps & { title: string };

export const CustomButton = ({ title, ...props }: Props) => {
  const { success, white } = useThemeColor();

  return (
    <Pressable
      {...props}
      style={[
        styles.button,
        { backgroundColor: success, opacity: props.disabled ? 0.5 : 1 },
      ]}
    >
      <Text style={[styles.buttonText, { color: white }]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    padding: 20,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    textTransform: "uppercase",
    fontSize: 20,
    fontWeight: 600,
  },
});
