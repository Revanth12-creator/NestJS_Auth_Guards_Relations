import { PartialType } from '@nestjs/mapped-types';
import { CreateQuationDto } from './create-quation.dto';

export class UpdateQuationDto extends PartialType(CreateQuationDto) {}
