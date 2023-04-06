import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

import { 
  AWS_SECRET_ACCESS_KEY, 
  AWS_ACCESS_KEY_ID, 
  AWS_BUCKET_NAME, 
  AWS_BUCKET_REGION } from './env-variables.js';

aws.config.update({
    region: AWS_BUCKET_REGION,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    accessKeyId: AWS_ACCESS_KEY_ID
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: AWS_BUCKET_NAME,
        acl: 'public-read',
        metadata: function(req, file, cb) {
            cb(null, {fieldName: file.fieldname})
        },
        key: function(req, file, cb) {
            cb(null, Date.now().toString()+file.originalname.replace(/ /g,''));
            //filename: string datetime + original name having no white space
        }
    })
});

export {
    upload,
    s3
}