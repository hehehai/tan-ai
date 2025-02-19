import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { type AuthFormSchema, authFormSchema } from "~/server/validations";

export function AuthForm({
	children,
	onSubmit,
}: {
	onSubmit: (data: AuthFormSchema) => void;
	children: React.ReactNode;
}) {
	const form = useForm<AuthFormSchema>({
		resolver: zodResolver(authFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4 px-4 sm:px-16"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="flex flex-col gap-2">
							<FormLabel className="text-zinc-600 font-normal dark:text-zinc-400">
								Email Address
							</FormLabel>
							<FormControl>
								<Input
									className="bg-muted text-md md:text-sm"
									type="email"
									placeholder="user@acme.com"
									autoComplete="email"
									autoFocus
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="flex flex-col gap-2">
							<FormLabel className="text-zinc-600 font-normal dark:text-zinc-400">
								Password
							</FormLabel>
							<FormControl>
								<Input
									className="bg-muted text-md md:text-sm"
									type="password"
									required
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{children}
			</form>
		</Form>
	);
}
