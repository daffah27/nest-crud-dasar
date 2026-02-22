import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MakananModule } from './makanan/makanan.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BahanModule } from './bahan/bahan.module';

@Module({
  imports: [MakananModule, AuthModule, UsersModule, BahanModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
