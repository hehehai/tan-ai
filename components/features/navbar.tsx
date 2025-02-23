import { Link, useNavigate } from "@tanstack/react-router";
import type { User } from "better-auth";
import { authClient } from "~/lib/auth/auth.client";
import {
	HugeiconsGithub,
	HugeiconsNewTwitter,
	SlashIcon,
} from "../shared/icons";
import ThemeToggle from "../shared/theme-toggle";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { History } from "./history";

export const Navbar = ({ user }: { user: User | null }) => {
	const navigate = useNavigate();

	return (
		<>
			<div className="bg-background absolute top-0 left-0 w-dvw py-2 px-3 justify-between flex flex-row items-center z-30">
				<div className="flex flex-row gap-3 items-center">
					<History user={user} />
					<div className="flex flex-row gap-2 items-center">
						<img
							src="/images/gemini-logo.png"
							alt="gemini logo"
							className="size-5"
						/>
						<div className="text-zinc-500">
							<SlashIcon />
						</div>
						<div className="text-sm dark:text-zinc-300 truncate w-28 md:w-fit">
							Next.js Gemini Chatbot
						</div>
					</div>
				</div>

				<div className="flex flex-row gap-2 items-center">
					<div className="flex flex-row gap-2 items-center">
						<Button variant="secondary" size="icon" asChild>
							<a
								href="https://x.com/riverhohai"
								target="_blank"
								rel="noreferrer"
							>
								<HugeiconsNewTwitter />
							</a>
						</Button>
						<Button variant="secondary" size="icon" asChild>
							<a
								href="https://github.com/hehehai/tan-ai"
								target="_blank"
								rel="noreferrer"
							>
								<HugeiconsGithub />
							</a>
						</Button>
					</div>
					{user ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button className="h-fit font-normal" variant="secondary">
									{user?.email}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem>
									<ThemeToggle />
								</DropdownMenuItem>
								<DropdownMenuItem className="p-1 z-50">
									<form
										className="w-full"
										onSubmit={async (e) => {
											e.preventDefault();
											const result = await authClient.signOut();
											if (result.error) {
												throw new Error(result.error.message);
											}
											navigate({ to: "/" });
										}}
									>
										<button
											type="submit"
											className="w-full text-left px-1 py-0.5 text-red-500"
										>
											Sign out
										</button>
									</form>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Button className="h-fit font-normal text-white" asChild>
							<Link to="/signin">Login</Link>
						</Button>
					)}
				</div>
			</div>
		</>
	);
};
