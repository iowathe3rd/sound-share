// create-track.dto.ts
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty()
  coverUrl: string;
}

