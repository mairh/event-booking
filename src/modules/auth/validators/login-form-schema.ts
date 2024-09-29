import { z } from 'zod';

export const LoginFormSchema = z.object({
  username: z.string().trim().min(1, { message: 'Username can not be empty.' }),
  password: z.string().trim().min(1, { message: 'Password can not be empty.' }),
});
