import { useChat } from "@ai-sdk/react";
import type { Attachment, Message } from "ai";
import { useState } from "react";

import { Message as PreviewMessage } from "~/components/features/message";
import { useScrollToBottom } from "~/hooks/use-scroll-to-bottom";

import { toast } from "sonner";
import { MultimodalInput } from "~/components/features/multimodal-input";
import { Overview } from "~/components/features/overview";

export function Chat({
	id,
	initialMessages,
}: {
	id: string;
	initialMessages: Array<Message>;
}) {
	const { messages, handleSubmit, input, setInput, append, status, stop } =
		useChat({
			id,
			body: { id },
			initialMessages,
			maxSteps: 10,
			onError(error) {
				toast.error("Failed to generate response", {
					description: error.message,
				});
			},
		});

	const [messagesContainerRef, messagesEndRef] =
		useScrollToBottom<HTMLDivElement>();

	const [attachments, setAttachments] = useState<Array<Attachment>>([]);

	return (
		<div className="flex flex-row justify-center pb-4 md:pb-8 h-dvh bg-background">
			<div className="flex flex-col justify-between items-center gap-4">
				<div
					ref={messagesContainerRef}
					className="flex flex-col gap-4 h-full w-dvw items-center overflow-y-scroll"
				>
					{messages.length === 0 && <Overview />}

					{messages.map((message, idx) => (
						<PreviewMessage
							key={message.id ?? idx}
							chatId={id}
							role={message.role}
							content={message.content}
							attachments={message.experimental_attachments}
							toolInvocations={message.toolInvocations}
						/>
					))}

					<div
						ref={messagesEndRef}
						className="shrink-0 min-w-[24px] min-h-[24px]"
					/>
				</div>

				<form className="flex flex-row gap-2 relative items-end w-full md:max-w-[500px] max-w-[calc(100dvw-32px) px-4 md:px-0">
					<MultimodalInput
						input={input}
						setInput={setInput}
						handleSubmit={handleSubmit}
						isLoading={["submitted", "streaming"].includes(status)}
						stop={stop}
						attachments={attachments}
						setAttachments={setAttachments}
						messages={messages}
						append={append}
					/>
				</form>
			</div>
		</div>
	);
}
