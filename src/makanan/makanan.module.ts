import { Module } from '@nestjs/common';
import { MakananService } from './makanan.service';
import { MakananController } from './makanan.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [MakananController],
  providers: [MakananService, PrismaService],
})
export class MakananModule {}
