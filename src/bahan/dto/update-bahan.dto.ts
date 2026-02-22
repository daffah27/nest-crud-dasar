import { PartialType } from '@nestjs/mapped-types';
import { CreateBahanDto } from './create-bahan.dto';

export class UpdateBahanDto extends PartialType(CreateBahanDto) {}
