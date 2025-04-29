import { z } from 'zod';

const envSchema = z.object({
  PUBLIC_API_URL: z.string().url(),
});

const env = envSchema.parse({
  PUBLIC_API_URL: import.meta..PUBLIC_API_URL,
});

export default env;
