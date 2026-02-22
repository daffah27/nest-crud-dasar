import { Module } from '@nestjs/common';
import { MakananService } from './makanan.service';
import { MakananController } from './makanan.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MakananController],
  providers: [MakananService, PrismaService],
})
export class MakananModule {}
