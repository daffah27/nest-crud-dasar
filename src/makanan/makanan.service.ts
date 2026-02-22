import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMakananDto } from './dto/create-makanan.dto';
import { UpdateMakananDto } from './dto/update-makanan.dto';
import { Makanan } from './entities/makanan.entity';


@Injectable()
export class MakananService {
  private makanan: Makanan[] = [];
  private idCounter = 1;

  create(createMakananDto: CreateMakananDto) {
    try {
      const newMakanan = new Makanan(
        this.idCounter++,
        createMakananDto.nama,
        createMakananDto.harga
      );
      this.makanan.push(newMakanan);
      return 'Makanan berhasil dibuat';
    } catch (error: any) {
      throw new BadRequestException('Gagal membuat makanan: ' + error.message);
    }
  }

  findAll() {
    return {
      message: 'Daftar makanan berhasil diambil',
      data: this.makanan
    }
  }

  findOne(id: number) {
    try {
      const makanan = this.makanan.find(m => m.id === id);
      if (!makanan) {
        throw new BadRequestException('Makanan tidak ditemukan');
      }
      return makanan;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  update(id: number, updateMakananDto: UpdateMakananDto) {
    const makanan = this.makanan.find(m => m.id === id);
    if (makanan) {
      makanan.nama = updateMakananDto.nama ?? makanan.nama;
      makanan.harga = updateMakananDto.harga ?? makanan.harga;
      return 'Makanan berhasil diperbarui';
    } else {
      throw new BadRequestException('Makanan tidak ditemukan');
    }
  }

  remove(id: number) {
    const index = this.makanan.findIndex(m => m.id === id);
    if (index !== -1) {
      this.makanan.splice(index, 1);
      return 'Makanan berhasil dihapus';
    } else {
      throw new BadRequestException('Makanan tidak ditemukan');
    }
  }

  reset() {
    this.makanan = [];
    this.idCounter = 1;
    return 'Data makanan berhasil direset';
  }
}
