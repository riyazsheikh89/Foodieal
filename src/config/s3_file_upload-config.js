import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

import {
    AWS_BUCKET_NAME, 
    AWS_BUCKET_REGION, 
    AWS_ACCESS_KEY_ID, 
    AWS_SECRET_ACCESS_KEY 
} from '../config/env-variables.js';



const s3Client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
});

// UPLOAD files to S3 Bucket
function uploadFile(fileBuffer, fileName, mimetype) {
  const uploadPayload = {
    Bucket: AWS_BUCKET_NAME,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype
  }
  return s3Client.send(new PutObjectCommand(uploadPayload));
}

// DELETE files FROM S3 Bucket
function deleteFile(fileName) {
  const deleteParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: fileName,
  }
  return s3Client.send(new DeleteObjectCommand(deleteParams));
}

// GET FILES from S3 Bucket
async function getObjectSignedUrl(fileName) {
  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: fileName
  }

  const command = new GetObjectCommand(params);
  const url = await getSignedUrl(s3Client, command, { expiresIn: 86400 });
  return url;
}

export {
    uploadFile,
    deleteFile,
    getObjectSignedUrl
}