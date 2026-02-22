import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBahanDto } from './dto/create-bahan.dto';
import { UpdateBahanDto } from './dto/update-bahan.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BahanService {
  constructor(private prisma: PrismaService) {}

  async create(createBahanDto: CreateBahanDto) {
    await this.prisma.bahan.create({
      data: createBahanDto
    });
    return 'Bahan berhasil dibuat';
  }

  async index() {
    return {
      message: 'Daftar bahan berhasil diambil',
      data: await this.prisma.bahan.findMany()
    }
  }

  async update(id: number, updateBahanDto: UpdateBahanDto) {
    const bahan = await this.prisma.bahan.findUnique({
      where: { id }
    });
    if (bahan) {
      await this.prisma.bahan.update({
        where: { id },
        data: updateBahanDto
      });
      return 'Bahan berhasil diperbarui';
    } else { 
      throw new NotFoundException('Bahan tidak ditemukan');
    }
  }

  async remove(id: number) {
    const bahan = await this.prisma.bahan.findUnique({
      where: { id }
    });
    if (bahan) {
      await this.prisma.bahan.delete({
        where: { id }
      });
      return 'Bahan berhasil dihapus';
    } else {
      throw new NotFoundException('Bahan tidak ditemukan');
    }
  }
}
