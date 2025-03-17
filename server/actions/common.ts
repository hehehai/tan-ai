import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "~/lib/middleware/auth-guard";
import { uploadFileToR2 } from "~/lib/upload/server";
import { uploadFileSchema } from "../validations";

export const actionUploadFile = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.validator((formData: FormData) => {
		if (!(formData instanceof FormData)) {
			throw new Error("Invalid form data");
		}
		const file = formData.get("file");

		const valid = uploadFileSchema.safeParse({ file });
		if (!valid.success) {
			throw new Error(valid.error.message);
		}

		return valid.data;
	})
	.handler(async ({ data }) => {
		const file = data.file;

		const { safeFilename, fileUrl, contentType } = await uploadFileToR2(
			Buffer.from(await file.arrayBuffer()),
			file.name,
			file.type,
		);

		return {
			url: fileUrl,
			name: safeFilename,
			contentType,
		};
	});
