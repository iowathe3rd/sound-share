import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import {db} from "../../lib/prisma";
import {PutObjectCommand} from "@aws-sdk/client-s3";

@Injectable()
export class TrackService {
  async create(createTrackDto: CreateTrackDto & {file: Express.Multer.File}) {
    const awsCommand = new PutObjectCommand({
      Bucket: "",
      Key: '',
      Body: ""
    })
  }

  findAll() {
    return `This action returns all track`;
  }

  findOne(id: number) {
    return `This action returns a #${id} track`;
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: number) {
    return `This action removes a #${id} track`;
  }
}
