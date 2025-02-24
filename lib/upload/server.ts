import crypto from "node:crypto";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { format } from "date-fns";
import { env } from "../utils/env.server";
import { uploadClient } from "./s3";

export const getSafeFilename = (name: string) => {
	const ext = name.split(".").pop();
	const hash = crypto.createHash("md5").update(name).digest("hex");
	return `${hash}.${ext}`;
};

export async function getR2File(fileName: string) {
	try {
		console.log("[R2] 下载文件");

		const file = await uploadClient.send(
			new GetObjectCommand({
				Bucket: env.CLOUD_FLARE_S3_UPLOAD_BUCKET,
				Key: fileName,
			}),
		);
		if (!file) {
			throw new Error("文件未找到");
		}
		return file;
	} catch (err) {
		console.error("[R2] 下载文件失败", err);
		throw err;
	}
}

export async function uploadFileToR2(
	buffer: Buffer,
	fileName: string,
	contentType: string,
): Promise<{
	safeFilename: string;
	fileUrl: string;
	contentType: string;
}> {
	try {
		console.log("[R2] 直接上传文件");

		const safeFilename = `${format(new Date(), "yy-MM-dd")}/${Date.now()}${getSafeFilename(fileName)}`;

		await uploadClient.send(
			new PutObjectCommand({
				Bucket: env.CLOUD_FLARE_S3_UPLOAD_BUCKET,
				Key: safeFilename,
				Body: buffer,
				ContentType: contentType,
			}),
		);

		const fileUrl = `${env.VITE_CLOUD_FLARE_R2_URL}/${safeFilename}`;
		console.log(`[R2] 文件上传成功: ${fileUrl}`);

		return {
			safeFilename,
			fileUrl,
			contentType,
		};
	} catch (err) {
		console.error("[R2] 直接上传文件失败", err);
		throw err;
	}
}
