import { createFileRoute, redirect } from "@tanstack/react-router";
import { generateUUID } from "~/lib/utils";

export const Route = createFileRoute("/(www)/chat/")({
	loader: async () => {
		const uuid = generateUUID();
		throw redirect({
			to: "/chat/$id",
			params: {
				id: uuid,
			},
		});
	},
	component: () => null,
});
