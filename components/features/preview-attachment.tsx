import type { Attachment } from "ai";

import { LoaderIcon } from "~/components/shared/icons";

export const PreviewAttachment = ({
	attachment,
	isUploading = false,
}: {
	attachment: Attachment;
	isUploading?: boolean;
}) => {
	const { name, url, contentType } = attachment;

	return (
		<div className="flex flex-col gap-2 max-w-16">
			<div className="h-20 w-16 bg-muted rounded-md relative flex flex-col items-center justify-center">
				{contentType ? (
					contentType.startsWith("image") ? (
						<img
							key={url}
							src={url}
							alt={name ?? "An image attachment"}
							className="rounded-md size-full object-cover"
						/>
					) : (
						<div className="" />
					)
				) : (
					<div className="" />
				)}

				{isUploading && (
					<div className="animate-spin absolute text-zinc-500">
						<LoaderIcon />
					</div>
				)}
			</div>

			<div className="text-xs text-zinc-500 max-w-16 truncate">{name}</div>
		</div>
	);
};
