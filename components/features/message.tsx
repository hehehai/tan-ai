import type { Attachment, ToolInvocation } from "ai";
import { motion } from "motion/react";
import type { ReactNode } from "react";

import { AuthorizePayment } from "~/components/features/flights/authorize-payment";
import { DisplayBoardingPass } from "~/components/features/flights/boarding-pass";
import { CreateReservation } from "~/components/features/flights/create-reservation";
import { FlightStatus } from "~/components/features/flights/flight-status";
import { ListFlights } from "~/components/features/flights/list-flights";
import { SelectSeats } from "~/components/features/flights/select-seats";
import { VerifyPayment } from "~/components/features/flights/verify-payment";
import { Markdown } from "~/components/features/markdown";
import { PreviewAttachment } from "~/components/features/preview-attachment";
import { Weather } from "~/components/features/weather";
import { BotIcon, UserIcon } from "~/components/shared/icons";

export const Message = ({
	chatId,
	role,
	content,
	toolInvocations,
	attachments,
}: {
	chatId: string;
	role: string;
	content: string | ReactNode;
	toolInvocations: Array<ToolInvocation> | undefined;
	attachments?: Array<Attachment>;
}) => {
	return (
		<motion.div
			className={
				"flex flex-row gap-4 px-4 w-full md:w-[500px] md:px-0 first-of-type:pt-20"
			}
			initial={{ y: 5, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
		>
			<div className="size-[24px] border rounded-sm p-1 flex flex-col justify-center items-center shrink-0 text-zinc-500">
				{role === "assistant" ? <BotIcon /> : <UserIcon />}
			</div>

			<div className="flex flex-col gap-2 w-full">
				{content && typeof content === "string" && (
					<div className="text-zinc-800 dark:text-zinc-300 flex flex-col gap-4">
						<Markdown>{content}</Markdown>
					</div>
				)}

				{toolInvocations && (
					<div className="flex flex-col gap-4">
						{toolInvocations.map((toolInvocation) => {
							const { toolName, toolCallId, state } = toolInvocation;

							if (state === "result") {
								const { result } = toolInvocation;

								return (
									<div key={toolCallId}>
										{toolName === "getWeather" ? (
											<Weather weatherAtLocation={result} />
										) : toolName === "displayFlightStatus" ? (
											<FlightStatus flightStatus={result} />
										) : toolName === "searchFlights" ? (
											<ListFlights chatId={chatId} results={result} />
										) : toolName === "selectSeats" ? (
											<SelectSeats chatId={chatId} availability={result} />
										) : toolName === "createReservation" ? (
											Object.keys(result).includes("error") ? null : (
												<CreateReservation reservation={result} />
											)
										) : toolName === "authorizePayment" ? (
											<AuthorizePayment intent={result} />
										) : toolName === "displayBoardingPass" ? (
											<DisplayBoardingPass boardingPass={result} />
										) : toolName === "verifyPayment" ? (
											<VerifyPayment result={result} />
										) : (
											<div>{JSON.stringify(result, null, 2)}</div>
										)}
									</div>
								);
							}
							return (
								<div key={toolCallId} className="skeleton">
									{toolName === "getWeather" ? (
										<Weather />
									) : toolName === "displayFlightStatus" ? (
										<FlightStatus />
									) : toolName === "searchFlights" ? (
										<ListFlights chatId={chatId} />
									) : toolName === "selectSeats" ? (
										<SelectSeats chatId={chatId} />
									) : toolName === "createReservation" ? (
										<CreateReservation />
									) : toolName === "authorizePayment" ? (
										<AuthorizePayment />
									) : toolName === "displayBoardingPass" ? (
										<DisplayBoardingPass />
									) : null}
								</div>
							);
						})}
					</div>
				)}

				{attachments && (
					<div className="flex flex-row gap-2">
						{attachments.map((attachment) => (
							<PreviewAttachment key={attachment.url} attachment={attachment} />
						))}
					</div>
				)}
			</div>
		</motion.div>
	);
};
