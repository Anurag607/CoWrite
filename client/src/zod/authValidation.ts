import * as z from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const SignupSchema = LoginSchema.extend({});

const AuthSsessionSchema = z.object({
  _id: z.string(),
  token: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export type ILogin = z.infer<typeof LoginSchema>;
export type ISignup = z.infer<typeof SignupSchema>;
export type RAuthSession = z.infer<typeof AuthSsessionSchema>;
