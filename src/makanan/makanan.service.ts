import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMakananDto } from './dto/create-makanan.dto';
import { UpdateMakananDto } from './dto/update-makanan.dto';
import { PrismaService } from 'src/prisma.service';
import { TambahBahanDto } from './dto/tambah-bahan.dto';


@Injectable()
export class MakananService {
  constructor(private prisma: PrismaService) { }

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
    const makanans = await this.prisma.makanan.findMany({
      include: {
        bahans: true
      }
    });

    const dataMakanan = makanans.map(makanan => ({
      nama: makanan.nama,
      totalHarga: makanan.bahans.reduce((total, bahan) => total + bahan.harga, 0),
      bahan: makanan.bahans.map(bahan => ({
        nama: bahan.nama,
        harga: bahan.harga
      }))
    }));



    return {
      message: 'Daftar makanan berhasil diambil',
      data: dataMakanan
    }
  }

  async findOne(id: number) {
    try {
      const makanan = await this.prisma.makanan.findUnique({
        where: { id },
        include: {
          bahans: true
        }

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

  async tambahBahan(tambahBahanDto: TambahBahanDto) {
    const makanan = await this.prisma.makanan.findUnique({
      where: { id: +tambahBahanDto.makananId }
    });
    const bahan = await this.prisma.bahan.findUnique({
      where: { id: +tambahBahanDto.bahanId }
    });
    if (!makanan) {
      throw new BadRequestException('Makanan tidak ditemukan');
    }
    if (!bahan) {
      throw new BadRequestException('Bahan tidak ditemukan');
    }
    const dataSudahAda = await this.prisma.makanan.findFirst({
      where: {
        id: +tambahBahanDto.makananId,
        bahans: {
          some: {
            id: +tambahBahanDto.bahanId
          }
        }
      }
    });
    if (dataSudahAda) {
      throw new BadRequestException('Bahan sudah ada di makanan');
    }
    await this.prisma.makanan.update({
      where: { id: +tambahBahanDto.makananId },
      data: {
        bahans: {
          connect: { id: +tambahBahanDto.bahanId }
        }
      }
    });
    return 'Bahan berhasil ditambahkan ke makanan';
  }
}
