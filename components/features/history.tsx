import { useState } from "react";
import { toast } from "sonner";

import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import type { User } from "better-auth";
import { queryClient } from "~/app/router";
import {
	InfoIcon,
	MenuIcon,
	MoreHorizontalIcon,
	PencilEditIcon,
	TrashIcon,
} from "~/components/shared/icons";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "~/components/ui/sheet";
import type { Chat } from "~/lib/db/schema";
import { cn, getTitleFromChat } from "~/lib/utils";
import { actionGetUserChats } from "~/server/actions/chat";

export const History = ({ user }: { user: User | null }) => {
	const { id } = useParams({ from: "/(www)/chat/$id" });

	const [isHistoryVisible, setIsHistoryVisible] = useState(false);

	const historyQuery = useQuery({
		queryKey: ["history"],
		queryFn: () => actionGetUserChats(),
		enabled: !!user,
	});

	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	const handleDelete = async () => {
		const deletePromise = fetch(`/api/chat?id=${deleteId}`, {
			method: "DELETE",
		});

		toast.promise(deletePromise, {
			loading: "Deleting chat...",
			success: () => {
				queryClient.setQueryData(["history"], (old: Array<Chat>) =>
					old.filter((chat) => chat.id !== deleteId),
				);
				setShowDeleteDialog(false);
				return "Chat deleted successfully";
			},
			error: "Failed to delete chat",
		});

		setShowDeleteDialog(false);
	};

	return (
		<>
			<Button
				variant="outline"
				className="h-fit"
				onClick={() => {
					setIsHistoryVisible(true);
				}}
			>
				<MenuIcon />
			</Button>

			<Sheet
				open={isHistoryVisible}
				onOpenChange={(state) => {
					setIsHistoryVisible(state);
				}}
			>
				<SheetContent side="left" className="p-3 w-80 bg-muted">
					<SheetHeader className="flex flex-row items-center gap-3 py-0 px-1">
						<SheetTitle className="text-left font-semibold">History</SheetTitle>
						{user && (
							<SheetDescription className="text-left">
								<span>
									{historyQuery.isLoading
										? "loading"
										: historyQuery.data?.length}
								</span>
								<span className="text-zinc-600 ml-1">chats</span>
							</SheetDescription>
						)}
					</SheetHeader>

					<div className="mt-6 flex flex-col">
						{user && (
							<Button
								className="font-normal text-sm flex flex-row justify-between text-white"
								asChild
							>
								<Link to="/">
									<div>Start a new chat</div>
									<PencilEditIcon className="text-sm" />
								</Link>
							</Button>
						)}

						<div className="flex flex-col gap-2 overflow-y-scroll py-2 h-[calc(100dvh-164px)]">
							{!user ? (
								<div className="text-zinc-500 h-dvh w-full flex flex-row justify-center items-center text-sm gap-2">
									<InfoIcon />
									<div>Login to save and revisit previous chats!</div>
								</div>
							) : null}

							{!historyQuery.isLoading &&
							historyQuery.data?.length === 0 &&
							user ? (
								<div className="text-zinc-500 h-dvh w-full flex flex-row justify-center items-center text-sm gap-2">
									<InfoIcon />
									<div>No chats found</div>
								</div>
							) : null}

							{historyQuery.isLoading && user ? (
								<div className="flex flex-col">
									{[44, 32, 28, 52].map((item) => (
										<div key={item} className="p-2 my-[2px]">
											<div
												className={`w-${item} h-[20px] rounded-md bg-zinc-200 dark:bg-zinc-600 animate-pulse`}
											/>
										</div>
									))}
								</div>
							) : null}

							{user &&
								historyQuery.data?.map((chat) => (
									<div
										key={chat.id}
										className={cn(
											"flex flex-row items-center gap-6 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md pr-2",
											{ "bg-zinc-200 dark:bg-zinc-700": chat.id === id },
										)}
									>
										<Button
											variant="ghost"
											className={cn(
												"hover:bg-zinc-200 dark:hover:bg-zinc-700 justify-between p-0 text-sm font-normal flex flex-row items-center gap-2 pr-2 w-full transition-none",
											)}
											asChild
										>
											<Link
												to={"/chat/$id"}
												params={{ id: chat.id }}
												className="text-ellipsis overflow-hidden text-left py-2 pl-2 rounded-lg outline-zinc-900"
											>
												{getTitleFromChat(chat)}
											</Link>
										</Button>

										<DropdownMenu modal={true}>
											<DropdownMenuTrigger asChild>
												<Button
													className="p-0 h-fit font-normal text-zinc-500 transition-none hover:bg-zinc-200 dark:hover:bg-zinc-700"
													variant="ghost"
												>
													<MoreHorizontalIcon />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent className="z-[60]">
												<DropdownMenuItem asChild>
													<Button
														className="flex flex-row gap-2 items-center justify-start w-full h-fit font-normal p-1.5 rounded-sm"
														variant="ghost"
														onClick={() => {
															setDeleteId(chat.id);
															setShowDeleteDialog(true);
														}}
													>
														<TrashIcon />
														<div>Delete</div>
													</Button>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								))}
						</div>
					</div>
				</SheetContent>
			</Sheet>

			<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your
							chat and remove it from our servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={handleDelete}>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};
