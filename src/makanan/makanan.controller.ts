import { Controller, Get, Post, Body, Put, Param, Delete, Res, UseInterceptors } from '@nestjs/common';
import { MakananService } from './makanan.service';
import { CreateMakananDto } from './dto/create-makanan.dto';
import { UpdateMakananDto } from './dto/update-makanan.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('makanan')
export class MakananController {
  constructor(private readonly makananService: MakananService) {}

  @Post()
  @UseInterceptors(FileInterceptor(''))
  create(@Body() createMakananDto: CreateMakananDto) {
    return this.makananService.create(createMakananDto);
  }

  @Get()
  findAll() {
    return this.makananService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.makananService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMakananDto: UpdateMakananDto) {
    return this.makananService.update(+id, updateMakananDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.makananService.remove(+id);
  }

  @Post('reset')
  reset() {
    return this.makananService.reset();
  }
}
