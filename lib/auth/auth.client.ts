import { oneTapClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";

export const authClient = createAuthClient({
	baseURL: import.meta.env.VITE_BASE_URL,
	plugins: [
		oneTapClient({
			clientId: import.meta.env.VITE_BETTER_AUTH_GOOGLE_CLIENT_ID,
			// Optional client configuration:
			autoSelect: false,
			cancelOnTapOutside: true,
			context: "signin",
			promptOptions: {
				baseDelay: 1000 * 60, // 1min
				maxAttempts: 2,
			},
		}),
	],
	fetchOptions: {
		onError(e) {
			if (e.error.status === 429) {
				toast.error("Too many requests. Please try again later.");
			}
		},
	},
});
