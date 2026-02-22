import { Module } from '@nestjs/common';
import { MakananService } from './makanan.service';
import { MakananController } from './makanan.controller';

@Module({
  controllers: [MakananController],
  providers: [MakananService],
})
export class MakananModule {}
