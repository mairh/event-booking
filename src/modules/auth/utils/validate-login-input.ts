import { LoginInput } from '../types';
import { LoginFormSchema } from '../validators';

export const validateLoginInput = ({ username, password }: LoginInput) => {
  const validatedFields = LoginFormSchema.safeParse({ username, password });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
};
