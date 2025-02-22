import { S3Client } from "@aws-sdk/client-s3";
import { env } from "../utils/env";

export const uploadClient = new S3Client({
	region: "auto",
	endpoint: `https://${env.CLOUD_FLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: env.CLOUD_FLARE_S3_UPLOAD_KEY,
		secretAccessKey: env.CLOUD_FLARE_S3_UPLOAD_SECRET,
	},
});
