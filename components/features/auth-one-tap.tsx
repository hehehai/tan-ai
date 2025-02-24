import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { authClient } from "~/lib/auth/auth.client";
import { DASHBOARD_URL } from "~/lib/const/common";

export function AuthOneTap() {
	const navigate = useNavigate();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		authClient.oneTap({
			fetchOptions: {
				onSuccess() {
					navigate({ to: DASHBOARD_URL });
				},
			},
		});
	}, []);

	return null;
}
