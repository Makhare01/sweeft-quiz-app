import { z } from "zod";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const fetchData = async <T>(
  endpoint: string,
  schema: z.ZodSchema<T>
): Promise<T> => {
  const response = await fetch(`${apiUrl}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const result = schema.safeParse(data);
  console;
  if (!result.success) {
    throw new Error(`Validation Error: ${result.error.message}`);
  }

  return result.data;
};
