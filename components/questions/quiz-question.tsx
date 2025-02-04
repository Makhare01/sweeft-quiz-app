import { useThemeColor } from "@/hooks/use-theme-color";
import { StyleSheet, Text, View } from "react-native";
import parse from "html-react-parser";
import { Answer } from "./answer";
import { useState } from "react";
import { CustomButton } from "../ui/custom-button";

type Props = {
  question: string;
  answers: Array<string>;
  correctAnswerIndex: number;
  isLast: boolean;
  onContinue: (isCorrect: boolean) => void;
};

export const QuizQuestion = ({
  question,
  answers,
  correctAnswerIndex,
  isLast,
  onContinue,
}: Props) => {
  const [selected, setSelected] = useState<number | undefined>();
  const { secondaryText } = useThemeColor();

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.question, { color: secondaryText }]}>
          {parse(question)}
        </Text>

        <View style={styles.answersContainer}>
          {answers.map((answer, index) => (
            <Answer
              key={answer}
              answer={answer}
              index={index}
              isSelected={selected === index}
              onPress={(index) => setSelected(index)}
            />
          ))}
        </View>
      </View>

      <CustomButton
        title={isLast ? "Finish" : "Continue"}
        disabled={selected === undefined}
        onPress={() => {
          onContinue(selected === correctAnswerIndex);
          setSelected(undefined);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
  },
  question: {
    fontSize: 22,
    fontWeight: 600,
    textAlign: "center",
    marginBottom: 64,
  },
  answersContainer: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: 30,
  },
});
