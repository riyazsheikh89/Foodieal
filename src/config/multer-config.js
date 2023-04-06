import { upload } from './s3_file_upload-config.js';

// for single file upload
export const singleUploader = upload.single('avatar');

// for multiple files upload
export const multipleUploader = upload.array('images', 3);