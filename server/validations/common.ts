import { z } from "zod";

export const uploadFileSchema = z.object({
	file: z
		.instanceof(File)
		.refine(
			(file) => {
				console.log(file);
				return file.size <= 5 * 1024 * 1024;
			},
			{
				message: "File size should be less than 5MB",
			},
		)
		.refine(
			(file) =>
				["image/jpeg", "image/png", "application/pdf"].includes(file.type),
			{
				message: "File type should be JPEG, PNG, or PDF",
			},
		),
});

export type UploadFileSchema = z.infer<typeof uploadFileSchema>;
