import { fetchData } from "./_request";
import { Difficulty, TCategories, TQuestions } from "./quiz.schema";

export const getCategories = async () => {
  return fetchData("api_category.php", TCategories);
};

type GetQuestionsInput = {
  categoryId: number;
  difficulty: Difficulty;
};

export const getQuestions = async ({
  categoryId,
  difficulty,
}: GetQuestionsInput) => {
  return fetchData(
    `api.php?amount=20&category=${categoryId}&difficulty=${difficulty}`,
    TQuestions
  );
};
