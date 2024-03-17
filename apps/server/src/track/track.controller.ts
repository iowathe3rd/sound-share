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
  UseInterceptors, UploadedFile, Query, NotFoundException
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
        file: file,
        authorId: ''
      });
      return res.status(HttpStatus.CREATED).json({data: created});
    }catch (e) {
      throw new BadGatewayException(e)
    }
  }

  @Get()
  async findAll(@Res() res: Response, @Query('limit') limit: number) {
    try {
      const found = await this.trackService.findAll(limit);
      return res.status(HttpStatus.FOUND).json({ data: found });
    }catch (error) {
      throw new BadGatewayException(error);
    }
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    try {
      const found = await this.trackService.findOne(id);
      return res.status(HttpStatus.FOUND).json({ data: found });
    } catch (error) {
      throw new BadGatewayException(error)
    }
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
