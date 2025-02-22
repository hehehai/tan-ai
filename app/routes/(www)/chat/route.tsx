import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Navbar } from "~/components/features/navbar";

export const Route = createFileRoute("/(www)/chat")({
	loader: async ({ context }) => {
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
