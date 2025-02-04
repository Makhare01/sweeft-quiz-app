import { getQuestions } from "@/api";
import { Difficulty } from "@/api/quiz.schema";
import { Questions } from "@/components/questions";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
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
    <View
      style={{
        flex: 1,
      }}
    >
      {match($questions)
        .with({ isLoading: true }, () => (
          <ActivityIndicator
            size="large"
            color={lightGreen}
            style={{ flex: 1 }}
          />
        ))
        .with({ isError: true, error: P.select() }, (error) => (
          <Text>{error.message}</Text>
        ))
        .with(
          { isSuccess: true, data: P.select() },
          ({ results: questions }) => {
            return (
              <View
                style={{
                  flex: 1,
                }}
              >
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
