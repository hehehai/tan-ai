import { useQueryClient } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import type { User } from "better-auth";
import { authClient } from "~/lib/auth/auth.client";
import { cn } from "~/lib/utils";
import { SlashIcon } from "../shared/icons";
import { SocialLinks } from "../shared/social-links";
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
  const queryClient = useQueryClient();
  const router = useRouter();

  return (
    <>
      <div className="bg-background absolute top-0 left-0 w-dvw py-2 px-3 justify-between flex flex-row items-center z-30">
        <div className="flex flex-row gap-3 items-center">
          <History user={user} />
          <div className="flex flex-row gap-2 items-center">
            <img src="/images/gemini-logo.png" alt="gemini logo" className="size-5" />
            <div className="text-zinc-500 hidden md:block">
              <SlashIcon />
            </div>
            <div
              className={cn(
                "text-sm dark:text-zinc-300 truncate w-28 md:block md:w-fit",
                !user ? "block" : "hidden",
              )}
            >
              Tanstack Start Gemini Chatbot
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <SocialLinks className="hidden md:flex" />
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
                      await queryClient.invalidateQueries({ queryKey: ["user"] });
                      await router.invalidate();
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
