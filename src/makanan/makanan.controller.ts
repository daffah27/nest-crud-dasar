import { Controller, Get, Post, Body, Put, Param, Delete, Res, UseInterceptors, UseGuards } from '@nestjs/common';
import { MakananService } from './makanan.service';
import { CreateMakananDto } from './dto/create-makanan.dto';
import { UpdateMakananDto } from './dto/update-makanan.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/enum/role.enum';

@UseGuards(AuthGuard, RolesGuard)
@Controller('makanan')
export class MakananController {
  constructor(private readonly makananService: MakananService) {}

  @Roles(Role.Admin)
  @Post()
  @UseInterceptors(FileInterceptor(''))
  async create(@Body() createMakananDto: CreateMakananDto) {
    return await this.makananService.create(createMakananDto);
  }

  @Get()
  async findAll() {
    return await this.makananService.findAll();
  } 

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.makananService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor(''))
  async update(@Param('id') id: string, @Body() updateMakananDto: UpdateMakananDto) {
    return await this.makananService.update(+id, updateMakananDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.makananService.remove(+id);
  }

  @Post('reset')
  async reset() {
    return await this.makananService.reset();
  }
}
