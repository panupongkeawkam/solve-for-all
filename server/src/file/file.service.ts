import { Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk";
import { v4 as uuid } from "uuid";

import { FileInterface } from "./interfaces/files.interface";
import { ResponseInterface } from "./interfaces/res.interface";

@Injectable()
export class FileService {
	// use to upload multiple image file to AWS S3 storage
	async fileUploads(
		files: FileInterface[],
	): Promise<ResponseInterface[] | null> {
		const s3Bucket = new S3();
		const uploadedFiles = [];
		for (const file of files) {
			const params = {
				Bucket: process.env.AWS_BUCKET_NAME,
				Body: file.buffer,
				Key: `${uuid()}-${file.fileName}`,
			};
			const uploadedFile = await s3Bucket.upload(params).promise();
			uploadedFiles.push(uploadedFile);
		}

		const responses: ResponseInterface[] = uploadedFiles.map((file) => ({
			path: file?.Location,
			key: file?.key,
			bucket: file?.Bucket,
		}));

		return responses;
	}
}
