import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const bucketRegion = process.env.BUCKET_REGION;
const bucketName = process.env.BUCKET_NAME;
const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId: awsAccessKeyId,
        secretAccessKey: awsSecretAccessKey,
    },
});

const storage = multerS3({
    s3: s3,
    bucket: bucketName,
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export default multer({ storage: storage });






//=========================================================
//woriking code before s3:
// import multer from 'multer';
// import { GridFsStorage } from 'multer-gridfs-storage';

// import dotenv from 'dotenv';


// dotenv.config();

// const USERNAME = process.env.DB_USERNAME;
// const PASSWORD = process.env.DB_PASSWORD;

// const storage = new GridFsStorage({
//     url:  `mongodb+srv://${USERNAME}:${PASSWORD}@whatsapp-web-clone.ct7dbvd.mongodb.net/?retryWrites=true&w=majority&appName=whatsapp-web-clone`,
//     options: { useNewUrlParser: true },
//     file: (request, file) => {
//         const match = ["image/png", "image/jpg"];

//         if(match.indexOf(file.memeType) === -1) 
//             return`${Date.now()}-blog-${file.originalname}`;

//         return {
//             bucketName: "photos",
//             filename: `${Date.now()}-blog-${file.originalname}`
//         }
//     }
// });

// export default multer({storage}); 

//CODE WITHOUT LOCALHOST 28/05.24:
// import multer from 'multer';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import dotenv from 'dotenv';

// dotenv.config();

// const USERNAME = process.env.DB_USERNAME;
// const PASSWORD = process.env.DB_PASSWORD;

// const storage = new GridFsStorage({
//     url:  `mongodb+srv://${USERNAME}:${PASSWORD}@whatsapp-web-clone.ct7dbvd.mongodb.net/?retryWrites=true&w=majority&appName=whatsapp-web-clone`,
//     options: { useUnifiedTopology: true, useNewUrlParser: true },
//     file: (request, file) => {
//         const match = ['image/png', 'image/jpg', 'application/pdf', 'text/plain']; // Include 'text/plain' for txt files

//         if (match.indexOf(file.mimetype) === -1) {
//             return `${Date.now()}-file-${file.originalname}`;
//         }

//         return {
//             bucketName: 'fs',
//             filename: `${Date.now()}-file-${file.originalname}`
//         }
//     }
// });

// export default multer({ storage });

//=========================================================


// import multer from 'multer';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import dotenv from 'dotenv';

// dotenv.config(); // Ensure environment variables are loaded

// const USERNAME = process.env.DB_USERNAME;
// const PASSWORD = process.env.DB_PASSWORD;

// const storage = new GridFsStorage({
//   url: `mongodb+srv://${USERNAME}:${PASSWORD}@whatsapp-web-clone.ct7dbvd.mongodb.net/?retryWrites=true&w=majority`,
//   file: (req, file) => {
//     const allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg"];
//     if (!allowedMimeTypes.includes(file.mimetype)) {
//       throw new Error("Invalid file type");
//     }
  
//     const filename = `${Date.now()}-file-${file.originalname}`;
  
//     return {
//       bucketName: 'photos', // Ensure this bucket exists
//       filename: filename,
//     };
//   },
// });

// const upload = multer({ storage: storage }); // Create your multer instance with the corrected storage setup

// export default upload; // Export the multer instance with the updated storage configuration
