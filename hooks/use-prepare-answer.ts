const shuffleArray = (array: Array<string>) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

type Args = {
  correctAnswer: string;
  incorrectAnswers: Array<string>;
};

export const usePrepareAnswer = ({ correctAnswer, incorrectAnswers }: Args) => {
  const allAnswers = [...incorrectAnswers, correctAnswer];
  const shuffledAnswers = shuffleArray(allAnswers);

  return {
    shuffledAnswers,
    correctIndex: shuffledAnswers.indexOf(correctAnswer), // Track correct answer index
  };
};
