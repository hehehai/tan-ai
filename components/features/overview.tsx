import { motion } from "motion/react";

import { MessageIcon, VercelIcon } from "~/components/shared/icons";

export const Overview = () => {
	return (
		<motion.div
			key="overview"
			className="max-w-[500px] mt-20 mx-4 md:mx-0"
			initial={{ opacity: 0, scale: 0.98 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.98 }}
			transition={{ delay: 0.5 }}
		>
			<div className="border-none bg-muted/50 rounded-2xl p-6 flex flex-col gap-4 text-zinc-500 text-sm dark:text-zinc-400 dark:border-zinc-700">
				<img
					src="https://tanstack.com/blog-assets/why-tanstack-start-and-router/tanstack-start-blog-header.jpg"
					alt="tanstack start cover"
					className="rounded-xl"
				/>
				<p className="flex flex-row justify-center gap-4 items-center text-zinc-900 dark:text-zinc-50">
					<VercelIcon />
					<span>+</span>
					<MessageIcon />
				</p>
				<p>
					This is an open source Chatbot template powered by the Google Gemini
					model built with Next.js and the AI SDK by Vercel. It uses the{" "}
					<code className="rounded-sm bg-muted-foreground/15 px-1.5 py-0.5">
						streamText
					</code>{" "}
					function in the server and the{" "}
					<code className="rounded-sm bg-muted-foreground/15 px-1.5 py-0.5">
						useChat
					</code>{" "}
					hook on the client to create a seamless chat experience.
				</p>
				<p className="break-all">
					<span>You can learn more</span>
					<a
						className="text-blue-500 dark:text-blue-400 ms-1 me-1"
						href="https://sdk.vercel.ai/docs"
						target="_blank"
						rel="noreferrer"
					>
						AI SDK Docs
					</a>
					<span>and</span>
					<a
						className="text-blue-500 dark:text-blue-400 ms-1 me-1"
						href="https://tanstack.com/start/latest"
						target="_blank"
						rel="noreferrer"
					>
						Tanstack Start Docs
					</a>
					<span>.</span>
				</p>
			</div>
		</motion.div>
	);
};
