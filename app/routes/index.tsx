import { createFileRoute, redirect } from "@tanstack/react-router";
import { generateUUID } from "~/lib/utils";

export const Route = createFileRoute("/")({
	component: () => null,
	beforeLoad: () => {
		const uuid = generateUUID();
		throw redirect({
			to: "/chat/$id",
			params: {
				id: uuid,
			},
		});
	},
});
