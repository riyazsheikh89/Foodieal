import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// for single file upload
export const singleUploader = upload.single('avatar');

// for multiple files upload
export const multipleUploader = upload.array('images', 3);