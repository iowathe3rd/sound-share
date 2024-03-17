import { CreateTrackDto } from './create-track.dto';
import {PartialType} from "@nestjs/swagger";

export class UpdateTrackDto extends PartialType(CreateTrackDto) {}
