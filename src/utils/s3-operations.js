import { upload, s3 } from '../config/s3_file_upload-config.js';
import { AWS_BUCKET_NAME } from '../config/env-variables.js'

// for single file upload
export const singleUploader = upload.single('avatar');

// for multiple files upload
export const multipleUploader = upload.array('images', 3);

// delete a file from S3 bucket
export const deleteFile = async function(fileName) {
    await s3.deleteObject({Bucket: AWS_BUCKET_NAME, Key: fileName}).promise();
}