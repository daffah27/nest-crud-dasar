import { PartialType } from '@nestjs/mapped-types';
import { CreateMakananDto } from './create-makanan.dto';

export class UpdateMakananDto extends PartialType(CreateMakananDto) {

}
