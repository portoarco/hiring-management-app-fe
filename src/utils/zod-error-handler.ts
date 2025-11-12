import { z } from "zod";

export function handleZodError(error: z.ZodError) {
  const formattedErrors: { [key: string]: string } = {};
  error.issues.forEach((issue) => {
    const field = issue.path[0] as string;
    formattedErrors[field] = issue.message;
  });
  return formattedErrors;
}
