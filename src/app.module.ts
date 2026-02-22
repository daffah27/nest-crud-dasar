import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MakananModule } from './makanan/makanan.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [MakananModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
