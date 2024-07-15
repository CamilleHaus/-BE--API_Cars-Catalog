import { z } from "zod";

export const userSchema = z.object({
    id: z.string(),
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1)
});

export const createUserSchema = userSchema.omit({ id: true })

export type TCreateUser = z.infer<typeof createUserSchema>

export const returnSchema = userSchema.omit({ password: true })

export type TReturn = z.infer<typeof returnSchema>

export const userLoginSchema = createUserSchema.omit({name: true})

export type TUserLogin = z.infer<typeof userLoginSchema>

export type TUserLoginReturn = {
    accessToken: string;
    user: TReturn
}