import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MakananModule } from './makanan/makanan.module';

@Module({
  imports: [MakananModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
