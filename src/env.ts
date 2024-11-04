import { z } from "zod";

export const envSchema = z
	.object({
		VITE_BASE_URL: z.string().url(),
		VITE_GOOGLE_CLIENT_ID: z.string(),
		VITE_GOOGLE_PROJECT_ID: z.string(),
		VITE_GOOGLE_AUTH_URI: z.string().url(),
		VITE_GOOGLE_TOKEN_URI: z.string().url(),
		VITE_GOOGLE_AUTH_PROVIDER_X509_CERT_URL: z.string().url(),
		VITE_GOOGLE_CLIENT_SECRET: z.string(),
		VITE_GOOGLE_REDIRECT_URIS: z.string(),
		VITE_GOOGLE_JAVASCRIPT_ORIGINS: z.string(),
	})
	.superRefine((input, ctx) => {
		const redirectUris = input.VITE_GOOGLE_REDIRECT_URIS.split(",");
		const javascriptOrigins = input.VITE_GOOGLE_JAVASCRIPT_ORIGINS.split(",");

		redirectUris.forEach((uri, index) => {
			if (!z.string().url().safeParse(uri).success) {
				ctx.addIssue({
					code: z.ZodIssueCode.invalid_string,
					validation: "url",
					message: `Invalid URL at GOOGLE_REDIRECT_URIS[${index}]`,
					path: ["GOOGLE_REDIRECT_URIS", index],
				});
			}
		});

		javascriptOrigins.forEach((origin, index) => {
			if (!z.string().url().safeParse(origin).success) {
				ctx.addIssue({
					code: z.ZodIssueCode.invalid_string,
					validation: "url",
					message: `Invalid URL at GOOGLE_JAVASCRIPT_ORIGINS[${index}]`,
					path: ["GOOGLE_JAVASCRIPT_ORIGINS", index],
				});
			}
		});
	});

const { data: env, error } = envSchema.safeParse(import.meta.env);

if (error) {
	console.error("❌ Invalid env:");
	console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
	process.exit(1);
}

export default env!;
