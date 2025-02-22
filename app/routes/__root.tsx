import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	HeadContent,
	Outlet,
	ScriptOnce,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { getWebRequest } from "@tanstack/start/server";
import { Suspense, lazy } from "react";
import { Toaster } from "~/components/ui/sonner";

import { auth } from "~/lib/auth";
import appCss from "~/styles/app.css?url";

const TanStackRouterDevtools =
	process.env.NODE_ENV === "production"
		? () => null // Render nothing in production
		: lazy(() =>
				// Lazy load in development
				import("@tanstack/router-devtools").then((res) => ({
					default: res.TanStackRouterDevtools,
				})),
			);

const getUser = createServerFn({ method: "GET" }).handler(async () => {
	const request = getWebRequest();
	if (!request) {
		return null;
	}
	const session = await auth.api.getSession({ headers: request.headers });

	return session?.user || null;
});

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
	{
		beforeLoad: async () => {
			const user = await getUser();
			return { user };
		},
		head: () => ({
			meta: [
				{
					charSet: "utf-8",
				},
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},
				{
					title: "TanAI",
				},
			],
			links: [{ rel: "stylesheet", href: appCss }],
		}),
		component: RootComponent,
	},
);

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: { readonly children: React.ReactNode }) {
	return (
		// suppress since we're updating the "dark" class in a custom script below
		<html suppressHydrationWarning lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<ScriptOnce>
					{`document.documentElement.classList.toggle(
            'dark',
            localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
            )`}
				</ScriptOnce>

				{children}

				<Toaster />
				<ReactQueryDevtools buttonPosition="bottom-left" />
				<Suspense>
					<TanStackRouterDevtools position="bottom-right" />
				</Suspense>

				<Scripts />
			</body>
		</html>
	);
}
