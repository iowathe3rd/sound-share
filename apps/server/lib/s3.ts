import {S3Client} from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }, // Замените 'default' на имя вашего профиля в файле credentials
  region: 'eu-north-1' // Замените 'us-east-1' на регион вашего бакета S3
});
