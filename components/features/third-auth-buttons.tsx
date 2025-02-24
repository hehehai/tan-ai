import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "~/lib/auth/auth.client";
import { DASHBOARD_URL } from "~/lib/const/common";
import { Button } from "../ui/button";

export function ThirdAuthSignInButtons() {
	const [isLoading, setIsLoading] = useState<"github" | "google" | null>(null);

	const handleSignIn = async (provider: "github" | "google") => {
		try {
			setIsLoading(provider);
			const result = await authClient.signIn.social({
				provider,
				callbackURL: DASHBOARD_URL,
			});
			if (result.error) {
				toast.error(result.error.message);
				return;
			}
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
		} finally {
			setIsLoading(null);
		}
	};

	return (
		<div className="flex flex-col gap-2">
			<Button
				onClick={() => handleSignIn("github")}
				disabled={isLoading === "github"}
			>
				{isLoading === "github" ? "Signing in..." : "Sign in with Github"}
			</Button>
			<Button
				onClick={() => handleSignIn("google")}
				disabled={isLoading === "google"}
			>
				{isLoading === "google" ? "Signing in..." : "Sign in with Google"}
			</Button>
		</div>
	);
}
