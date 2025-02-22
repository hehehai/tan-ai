import { Link } from "@tanstack/react-router";
import type { User } from "better-auth";
import { actionSignOut } from "~/server/actions/user";
import { SlashIcon } from "../shared/icons";
import ThemeToggle from "../shared/theme-toggle";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const Navbar = ({ user }: { user: User | null }) => {
	return (
		<>
			<div className="bg-background absolute top-0 left-0 w-dvw py-2 px-3 justify-between flex flex-row items-center z-30">
				<div className="flex flex-row gap-3 items-center">
					<div>history</div>
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

				{user ? (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								className="py-1.5 px-2 h-fit font-normal"
								variant="secondary"
							>
								{user?.email}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>
								<ThemeToggle />
							</DropdownMenuItem>
							<DropdownMenuItem className="p-1 z-50">
								<form className="w-full" action={actionSignOut.url}>
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
					<Button className="py-1.5 px-2 h-fit font-normal text-white" asChild>
						<Link to="/signin">Login</Link>
					</Button>
				)}
			</div>
		</>
	);
};
