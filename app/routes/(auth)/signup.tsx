import {
	Link,
	createFileRoute,
	redirect,
	useNavigate,
} from "@tanstack/react-router";
import { toast } from "sonner";
import { AuthForm } from "~/components/features/auth-form";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth/auth.client";
import { DASHBOARD_URL } from "~/lib/const/common";
import type { AuthFormSchema } from "~/server/validations";

export const Route = createFileRoute("/(auth)/signup")({
	component: AuthPage,
	beforeLoad: async ({ context }) => {
		if (context.user) {
			throw redirect({
				to: DASHBOARD_URL,
			});
		}
	},
});

function AuthPage() {
	const navigate = useNavigate();

	const handleSubmit = async (data: AuthFormSchema) => {
		const result = await authClient.signUp.email({
			email: data.email,
			password: data.password,
			name: data.email.split("@")[0],
		});

		if (result.error) {
			console.error(result.error);
			toast.error(result.error.message);
		} else {
			toast.success("Signed up successfully");
			navigate({ to: DASHBOARD_URL });
		}
	};

	return (
		<div className="flex h-dvh w-screen items-start pt-12 md:pt-0 md:items-center justify-center bg-background">
			<div className="w-full max-w-md overflow-hidden rounded-2xl flex flex-col gap-12">
				<div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
					<h3 className="text-xl font-semibold dark:text-zinc-50">Sign Up</h3>
					<p className="text-sm text-gray-500 dark:text-zinc-400">
						Use your email and password to sign up
					</p>
				</div>
				<AuthForm onSubmit={handleSubmit}>
					<Button type="submit">Sign up</Button>
					<p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
						{"Already have an account? "}
						<Link
							to="/signin"
							className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
						>
							Sign in
						</Link>
					</p>
				</AuthForm>
			</div>
		</div>
	);
}
