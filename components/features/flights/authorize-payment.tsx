import { useMutation, useQuery } from "@tanstack/react-query";
import { differenceInMinutes } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

import { CheckCircle, InfoIcon } from "~/components/shared/icons";
import { Input } from "~/components/ui/input";
import {
	actionUpdateReservation,
	queryGetReservationById,
} from "~/server/actions/chat";

export function AuthorizePayment({
	intent = { reservationId: "sample-uuid" },
}: {
	intent?: { reservationId: string };
}) {
	const query = useQuery({
		queryKey: ["reservation", intent.reservationId],
		queryFn: () =>
			queryGetReservationById({ data: { id: intent.reservationId } }),
	});

	const mutation = useMutation({
		mutationFn: (magicWord: string) =>
			actionUpdateReservation({
				data: { id: intent.reservationId, magicWord },
			}),
		onSuccess: () => {
			query.refetch();
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unknown error occurred");
			}
		},
	});

	const [input, setInput] = useState("");

	const handleAuthorize = async (magicWord: string) => {
		await mutation.mutateAsync(magicWord);
	};

	if (query.isLoading) {
		return <div>Loading</div>;
	}
	if (query.error) {
		return <div>Error</div>;
	}

	if (!query.data) {
		return <div>No data</div>;
	}

	return query.data?.hasCompletedPayment ? (
		<div className="bg-emerald-500 p-4 rounded-lg gap-4 flex flex-row justify-between items-center">
			<div className="dark:text-emerald-950 text-emerald-50 font-medium">
				Payment Verified
			</div>
			<div className="dark:text-emerald-950 text-emerald-50">
				<CheckCircle className="text-xl" />
			</div>
		</div>
	) : differenceInMinutes(new Date(), new Date(query.data?.createdAt)) > 150 ? (
		<div className="bg-red-500 p-4 rounded-lg gap-4 flex flex-row justify-between items-center">
			<div className="text-background">Payment Gateway Timed Out</div>
			<div className="text-background">
				<InfoIcon className="text-xl" />
			</div>
		</div>
	) : (
		<div className="bg-muted p-4 rounded-lg flex flex-col gap-2">
			<div className="text font-medium">
				Use your saved information for this transaction
			</div>
			<div className="text-muted-foreground text-sm sm:text-base">
				Enter the magic word to authorize payment. Hint: It rhymes with bercel.
			</div>

			<Input
				type="text"
				placeholder="Enter magic word..."
				className="dark:bg-zinc-700 text-base border-none mt-2"
				onChange={(event) => setInput(event.currentTarget.value)}
				onKeyDown={async (event) => {
					if (event.key === "Enter") {
						await handleAuthorize(input);
						setInput("");
					}
				}}
			/>
		</div>
	);
}
