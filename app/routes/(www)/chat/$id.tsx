import { createFileRoute } from "@tanstack/react-router";
import { Chat } from "~/components/features/chat";
import { queryGetChatById } from "~/server/actions/chat";

export const Route = createFileRoute("/(www)/chat/$id")({
	loader: async ({ params }) => {
		return queryGetChatById({
			data: {
				id: params.id,
			},
		});
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { id, chat } = Route.useLoaderData();

	return <Chat key={id} id={id} initialMessages={chat?.messages ?? []} />;
}
