import { PartialType } from '@nestjs/mapped-types';
import { CreateSeguidorDto } from './create-seguidor.dto';

export class UpdateSeguidorDto extends PartialType(CreateSeguidorDto) {}
