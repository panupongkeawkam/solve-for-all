import { Injectable } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { S3, AWSError } from "aws-sdk";

import { FileInterface } from "./interfaces/files.interface";
import { ResponseInterface } from "./interfaces/res.interface";

@Injectable()
export class FileService {
	// upload multiple files (max: 6)
	async fileUploads(
		files: FileInterface[],
	): Promise<ResponseInterface[] | null> {
		const s3Bucket = new S3();

		const uploadedFiles = await Promise.all(
			files.map(async (file) => {
				const params = {
					Bucket: process.env.AWS_BUCKET_NAME,
					Body: file.buffer,
					Key: `${uuid()}-${file.fileName}`,
				};
				return await s3Bucket.upload(params).promise();
			}),
		).then((images) => images);

		const responses: ResponseInterface[] = uploadedFiles.map((file) => ({
			path: file?.Location,
			key: file?.Key,
			bucket: file?.Bucket,
		}));

		return responses;
	}

	// upload single file
	async fileUpload(file: FileInterface): Promise<ResponseInterface | null> {
		const s3Bucket = new S3();
		const params = {
			Bucket: process.env.AWS_BUCKET_NAME,
			Body: file.buffer,
			Key: `${uuid()}-${file.fileName}`,
		};
		const uploadedFile = await s3Bucket.upload(params).promise();
		const response = {
			path: uploadedFile?.Location,
			key: uploadedFile?.Key,
			bucket: uploadedFile?.Bucket,
		};
		return response || null;
	}

	// remove multiple file when problem is occur.
	async removeFiles(uploadedFiles: ResponseInterface[]): Promise<void> {
		const s3Bucket = new S3();
		const Delete = {
			Objects: uploadedFiles.map((file) => ({ Key: file.key })),
			Quiet: false,
		};

		const params = {
			Bucket: process.env.AWS_BUCKET_NAME,
			Delete,
		};
		console.log(params);
		await s3Bucket.deleteObjects(
			params,
			(err: AWSError, data: S3.DeleteObjectsOutput) => {
				if (err) console.log("Error \n" + { ...err });
				else console.log("This is deleted images \n" + { ...data });
			},
		);
	}
}
