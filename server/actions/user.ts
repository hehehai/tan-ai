import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { getWebRequest } from "@tanstack/start/server";
import { auth } from "~/lib/auth";
import { authMiddleware } from "~/lib/middleware/auth-guard";

export const actionSignOut = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		if (context.user.id) {
			const request = getWebRequest();
			if (!request) {
				throw new Error("Unauthorized");
			}
			const { success } = await auth.api.signOut({
				headers: request.headers,
			});
			if (!success) {
				throw new Error("Failed to sign out");
			}
			throw redirect({ to: "/" });
		}
	});
