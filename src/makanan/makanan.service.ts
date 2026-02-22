import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMakananDto } from './dto/create-makanan.dto';
import { UpdateMakananDto } from './dto/update-makanan.dto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class MakananService {
  constructor(private prisma: PrismaService) {}

  async create(createMakananDto: CreateMakananDto) {
    try {
      await this.prisma.makanan.create({
        data: createMakananDto
      });
      return 'Makanan berhasil dibuat';
    } catch (error: any) {
      throw new BadRequestException('Gagal membuat makanan: ' + error.message);
    }
  }

  async findAll() {
    return {
      message: 'Daftar makanan berhasil diambil',
      data: await this.prisma.makanan.findMany()
    }
  }

  async findOne(id: number) {
    try {
      const makanan = await this.prisma.makanan.findUnique({
        where: { id }
      });
      if (!makanan) {
        throw new BadRequestException('Makanan tidak ditemukan');
      }
      return makanan;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateMakananDto: UpdateMakananDto) {
    const makanan = await this.prisma.makanan.findUnique({
      where: { id }
    });
    if (makanan) {
      await this.prisma.makanan.update({
        where: { id },
        data: updateMakananDto
      });
      return 'Makanan berhasil diperbarui';
    } else {
      throw new BadRequestException('Makanan tidak ditemukan');
    }
  }

  async remove(id: number) {
    const makanan = await this.prisma.makanan.findUnique({
      where: { id }
    });
    if (makanan) {
      await this.prisma.makanan.delete({
        where: { id }
      });
      return 'Makanan berhasil dihapus';
    } else {
      throw new BadRequestException('Makanan tidak ditemukan');
    }
  }

  async reset() {
    await this.prisma.makanan.deleteMany();
    return 'Data makanan berhasil direset';
  }
}
