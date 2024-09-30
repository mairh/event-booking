import { z } from 'zod';

import { LoginFormSchema } from '../validators';

export type FormData = z.infer<typeof LoginFormSchema>;

export type LoginInput = {
  password: string;
  username: string;
};
