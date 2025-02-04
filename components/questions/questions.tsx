import { StyleSheet, View } from "react-native";
import { QuizQuestion } from "./quiz-question";
import { Question } from "@/api";
import { CustomButton } from "../ui/custom-button";
import { useState } from "react";
import { usePrepareAnswer } from "@/hooks/use-prepare-answer";
import { ProgressBar } from "../ui/progress-bar";
import { useRouter } from "expo-router";

type Props = {
  questions: Array<Question>;
};

export const Questions = ({ questions }: Props) => {
  const [corrects, setCorrects] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const currentQuestion = questions[currentQuestionIndex];

  const { shuffledAnswers, correctIndex } = usePrepareAnswer({
    correctAnswer: currentQuestion.correct_answer,
    incorrectAnswers: currentQuestion.incorrect_answers,
  });

  const router = useRouter();

  return (
    <View style={styles.container}>
      <ProgressBar
        progress={currentQuestionIndex + 1}
        total={questions.length}
      />
      <QuizQuestion
        question={currentQuestion.question}
        answers={shuffledAnswers}
        correctAnswerIndex={correctIndex}
        isLast={currentQuestionIndex === questions.length - 1}
        onContinue={(isCorrect) => {
          if (isCorrect) {
            setCorrects((prevValue) => prevValue + 1);
          }

          if (currentQuestionIndex === questions.length - 1) {
            router.push(`/result?corrects=${corrects}`);

            return;
          }

          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
