import { getQuestions } from "@/api";
import { Difficulty } from "@/api/quiz.schema";
import { Questions } from "@/components/questions";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { match, P } from "ts-pattern";

const QuizView = () => {
  const { category, difficulty } = useLocalSearchParams() as {
    category: string;
    difficulty: Difficulty;
  };

  const $questions = useQuery({
    queryKey: ["questions", { category, difficulty }],
    queryFn: () => getQuestions({ categoryId: Number(category), difficulty }),
  });

  const { lightGreen } = useThemeColor();

  return (
    <View style={styles.container}>
      {match($questions)
        .with({ isLoading: true }, () => (
          <ActivityIndicator
            size="large"
            color={lightGreen}
            style={styles.container}
          />
        ))
        .with({ isError: true, error: P.select() }, (error) => (
          <Text>{error.message}</Text>
        ))
        .with(
          { isSuccess: true, data: P.select() },
          ({ results: questions }) => {
            return (
              <View style={styles.container}>
                <Questions questions={questions} />
              </View>
            );
          }
        )
        .run()}
    </View>
  );
};

export default QuizView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
