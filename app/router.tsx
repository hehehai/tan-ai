import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";

import { DefaultCatchBoundary } from "~/components/shared/default-catch-boundary";
import { NotFound } from "~/components/shared/not-found";
import { routeTree } from "./routeTree.gen";

export const queryClient = new QueryClient();

export function createRouter() {
	return routerWithQueryClient(
		createTanStackRouter({
			routeTree,
			context: { queryClient },
			defaultPreload: "intent",
			defaultErrorComponent: DefaultCatchBoundary,
			defaultNotFoundComponent: NotFound,
			scrollRestoration: true,
		}),
		queryClient,
	);
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
