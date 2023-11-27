import { ZodSchema, z } from "zod";

import dotenv from "dotenv";
dotenv.config();

const envSchema: ZodSchema<{
    DATABASE_URL: string;
}> = z.object({
    DATABASE_URL: z.string(),
});

const env = envSchema.parse(process.env);

if (!env.DATABASE_URL) {
    console.log("DATABASE_URL is not set");
}

export default env;