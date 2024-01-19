import * as z from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

const SignupSchema = LoginSchema.extend({
  username: z.string(),
});

export type ILogin = z.infer<typeof LoginSchema>;
export type ISignup = z.infer<typeof SignupSchema>;
