import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(www)/dashboard/")({
	component: DashboardIndex,
	loader: ({ context }) => {
		return { user: context.user };
	},
});

function DashboardIndex() {
	const { user } = Route.useLoaderData();

	return (
		<div className="flex flex-col gap-1">
			Dashboard index page
			<pre className="rounded-md border bg-card p-1 text-card-foreground">
				routes/dashboard/index.tsx
			</pre>
			<div>
				More data:
				<pre>{JSON.stringify(user, null, 2)}</pre>
			</div>
		</div>
	);
}
