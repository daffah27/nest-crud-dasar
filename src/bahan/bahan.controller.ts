import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors } from '@nestjs/common';
import { BahanService } from './bahan.service';
import { CreateBahanDto } from './dto/create-bahan.dto';
import { UpdateBahanDto } from './dto/update-bahan.dto';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('bahan')
export class BahanController {
  constructor(private readonly bahanService: BahanService) {}

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  async create(@Body() createBahanDto: CreateBahanDto) {
    return await this.bahanService.create(createBahanDto);
  }

  @Get()
  findAll() {
    return this.bahanService.index();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBahanDto: UpdateBahanDto) {
    return this.bahanService.update(+id, updateBahanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bahanService.remove(+id);
  }
}
