import {Injectable} from '@nestjs/common';
import {
  DeleteObjectCommand, DeleteObjectCommandOutput,
  GetObjectCommand,
  GetObjectCommandOutput,
  PutObjectAclCommandOutput,
  PutObjectCommand,
  S3Client
} from "@aws-sdk/client-s3";
import {ConfigService} from "@nestjs/config";


type uploadFileInput = {
  key: string,
  fileBuffer: Buffer
}
@Injectable()
export class AwsService {
  private readonly S3: S3Client
  private readonly Bucket: string;

  constructor(private config: ConfigService) {
    this.S3 = new S3Client({
      credentials: {
        accessKeyId: this.config.get("AWS_ACCESS_KEY_ID"),
        secretAccessKey: this.config.get("AWS_SECRET_ACCESS_KEY"),
      },
      region: 'eu-north-1' // Замените 'us-east-1' на регион вашего бакета S3
    });
    this.Bucket = this.config.get("AWS_BUCKET");
  }

  async uploadFile(data: uploadFileInput): Promise<PutObjectAclCommandOutput> {
    const command = new PutObjectCommand({
      Key: data.key,
      Body: data.fileBuffer,
      Bucket: this.Bucket
    })
    return await this.S3.send(command)
  }

  async getFile(key: string): Promise<GetObjectCommandOutput> {
    const command = new GetObjectCommand({
      Key: key,
      Bucket: this.Bucket,
    })

    return await this.S3.send(command);
  }

  async deleteFile(key: string): Promise<DeleteObjectCommandOutput> {
    const command = new DeleteObjectCommand({
      Bucket: this.Bucket,
      Key: key
    })
    return await this.S3.send(command);
  }

}
