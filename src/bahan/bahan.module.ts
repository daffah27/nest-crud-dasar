import { Module } from '@nestjs/common';
import { BahanService } from './bahan.service';
import { BahanController } from './bahan.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BahanController],
  providers: [BahanService, PrismaService],
})
export class BahanModule {}
