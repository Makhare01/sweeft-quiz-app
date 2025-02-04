import { useThemeColor } from "@/hooks/use-theme-color";
import { Pressable, StyleSheet, Text, View } from "react-native";
import parse from "html-react-parser";

type Props = {
  answer: string;
  isSelected: boolean;
  index: number;
  onPress: (index: number) => void;
};

export const Answer = ({ answer, isSelected, index, onPress }: Props) => {
  const { white, lightGreen, text, background } = useThemeColor();

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: isSelected ? lightGreen : white,
        },
      ]}
      onPress={() => onPress(index)}
    >
      <View
        style={[
          styles.answerNumber,
          {
            backgroundColor: isSelected ? white : background,
          },
        ]}
      >
        <Text
          style={[styles.answer, { color: isSelected ? lightGreen : text }]}
        >
          {String.fromCharCode(65 + index)}
        </Text>
      </View>
      <Text
        style={[
          styles.answer,
          {
            color: isSelected ? white : text,
          },
        ]}
      >
        {parse(answer)}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 60,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  answerNumber: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  answer: {
    fontSize: 16,
    fontWeight: 700,
    flexShrink: 1,
  },
});
