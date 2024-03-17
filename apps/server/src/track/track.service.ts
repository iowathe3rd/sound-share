import {BadGatewayException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateTrackDto} from './dto/create-track.dto';
import {UpdateTrackDto} from './dto/update-track.dto';
import {AwsService} from "../aws/aws.service";
import {v4 as uuidv4} from 'uuid';
import {db} from "../../lib/prisma";


@Injectable()
export class TrackService {
  constructor(private S3: AwsService) {
  }
  async create(createTrackDto: CreateTrackDto & { file: Express.Multer.File, authorId: string }) {
    const key = uuidv4();

    try {
      const uploaded = await this.S3.uploadFile({
        key: key,
        fileBuffer: createTrackDto.file.buffer
      });

      if (!uploaded) {
        return new BadGatewayException("Something went wrong while uploading file");
      }

      return db.track.create({
        data: {
          title: createTrackDto.title,
          description: createTrackDto.description,
          coverUrl: createTrackDto.coverUrl,
          awsKey: key,
          authorId: createTrackDto.authorId
        }
      });
    } catch (error) {
      throw new BadGatewayException("Something went wrong while creating track: " + error.message);
    }
  }

  async findAll(limit: number) {
    return db.track.findMany({
      take: limit || 10, // Если limit не определен, используем значение по умолчанию 10
    });
  }

  async findOne(id: string) {
    if (!await db.track.findUnique({
      where: {id},
    })) {
      throw new NotFoundException('Track not found');
    }
    return db.track.findUnique({
      where: {id},
    });
  }
  update(id: number, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: number) {
    return `This action removes a #${id} track`;
  }
}
