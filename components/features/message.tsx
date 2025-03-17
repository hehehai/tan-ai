import type { Attachment, JSONValue } from "ai";
import { motion } from "motion/react";

import { Markdown } from "~/components/features/markdown";
import { PreviewAttachment } from "~/components/features/preview-attachment";
import { BotIcon, UserIcon } from "~/components/shared/icons";
import type { MessagePart } from "~/lib/ai/types";
import { ToolInvocationView } from "./tools/tool-invocation";

export const Message = ({
  role,
  messageId,
  content,
  parts,
  attachments,
  annotations,
}: {
  messageId: string;
  chatId: string;
  role: string;
  content: string;
  parts: MessagePart[];
  attachments?: Array<Attachment>;
  annotations: JSONValue[] | undefined;
}) => {
  const renderPart = (
    part: MessagePart,
    messageId: string,
    partIdx: number,
    annotations: JSONValue[] | undefined,
  ) => {
    switch (part.type) {
      case "text":
        if (!part.text || part.text.trim() === "") {
          return null;
        }
        return (
          <div
            key={`${messageId}-${partIdx}-text`}
            className="text-zinc-800 dark:text-zinc-300 flex flex-col gap-4 w-full"
          >
            <Markdown>{part.text}</Markdown>
          </div>
        );
      case "tool-invocation":
        return (
          <ToolInvocationView
            key={`${messageId}-${partIdx}-tool`}
            toolInvocation={part.toolInvocation}
            annotations={annotations}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={"flex flex-row gap-4 px-4 w-full md:max-w-2xl md:px-0 first-of-type:pt-20"}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="size-[24px] border rounded-sm p-1 flex flex-col justify-center items-center shrink-0 text-zinc-500">
        {role === "assistant" ? <BotIcon /> : <UserIcon />}
      </div>

      <div className="flex flex-col gap-2 w-full">
        {role === "user" ? (
          <>
            <div className="text-zinc-800 dark:text-zinc-300 flex flex-col gap-4">
              <Markdown>{content}</Markdown>
            </div>
            {attachments && (
              <div className="flex flex-row gap-2">
                {attachments.map((attachment) => (
                  <PreviewAttachment key={attachment.url} attachment={attachment} />
                ))}
              </div>
            )}
          </>
        ) : (
          parts.map((part, idx) =>
            renderPart(part as MessagePart, messageId, idx, annotations),
          )
        )}
      </div>
    </motion.div>
  );
};
