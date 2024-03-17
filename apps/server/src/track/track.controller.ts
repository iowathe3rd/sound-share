import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  BadGatewayException,
  HttpStatus,
  UseInterceptors, UploadedFile
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import {Express, Response} from "express";
import {FileInterceptor} from "@nestjs/platform-express";
import 'multer'; // a hack to make Multer available in the Express namespace

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() createTrackDto: CreateTrackDto, @Res() res: Response, @UploadedFile() file: Express.Multer.File) {
    try {
      const created = await this.trackService.create({
        title: createTrackDto.title,
        description: createTrackDto.description,
        coverUrl: createTrackDto.coverUrl,

      });
      return res.status(HttpStatus.CREATED).json({data: created});
    }catch (e) {
      throw new BadGatewayException(e)
    }
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.update(+id, updateTrackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackService.remove(+id);
  }
}
