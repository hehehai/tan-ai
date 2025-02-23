import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Navbar } from "~/components/features/navbar";
import { actionGetUserChats } from "~/server/actions/chat";

export const Route = createFileRoute("/(www)/chat")({
	loader: async ({ context }) => {
		if (context.user) {
			await context.queryClient.prefetchQuery({
				queryKey: ["history"],
				queryFn: () => actionGetUserChats(),
			});
		}

		return {
			user: context.user,
		};
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = Route.useLoaderData();

	return (
		<>
			<Navbar user={user} />
			<Outlet />
		</>
	);
}
