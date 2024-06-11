import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
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

export const uploadFile = (request, response) => {
    
    if (!request.file)
        return response.status(404).json("File not found");

    const imageUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${request.file.key}`;
    response.status(200).json(imageUrl);
}

export const getImage = async (request, response) => {

    try {
        const params = {
            Bucket: bucketName,
            Key: request.params.filename,
        };

        const command = new GetObjectCommand(params);
        const file = await s3.send(command);

        response.attachment(request.params.filename);
        file.Body.pipe(response);

    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
}
