import { z } from "zod";

const TDifficulty = z.union([
  z.literal("easy"),
  z.literal("medium"),
  z.literal("hard"),
]);

export type Difficulty = z.infer<typeof TDifficulty>;

export const TCategories = z.object({
  trivia_categories: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
});

export type Categories = z.infer<typeof TCategories>;

const TQuestionType = z.union([z.literal("boolean"), z.literal("multiple")]);

const TQuestion = z.object({
  type: TQuestionType,
  difficulty: TDifficulty,
  category: z.string(),
  question: z.string(),
  correct_answer: z.string(),
  incorrect_answers: z.array(z.string()),
});

export type Question = z.infer<typeof TQuestion>;

export const TQuestions = z.object({
  results: z.array(TQuestion),
});
