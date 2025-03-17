import { createFileRoute } from "@tanstack/react-router";
import { Chat } from "~/components/features/chat";
import { convertToUIMessages } from "~/lib/utils";
import { queryGetChatMessagesById } from "~/server/actions/chat";

export const Route = createFileRoute("/(www)/chat/$id")({
  loader: async ({ params, context }) => {
    if (!context.user) {
      return {
        id: params.id,
        messages: [],
      };
    }

    const messages = await queryGetChatMessagesById({
      data: {
        id: params.id,
      },
    });

    return {
      id: params.id,
      messages,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { id, messages } = Route.useLoaderData();

  return (
    <Chat
      key={id}
      id={id}
      initialMessages={messages?.length ? convertToUIMessages(messages) : []}
    />
  );
}
