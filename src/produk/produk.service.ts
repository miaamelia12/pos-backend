import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdukDto } from './dto/create-produk.dto';
import { UpdateProdukDto } from './dto/update-produk.dto';
import { Produk } from './entities/produk.entity';

@Injectable()
export class ProdukService {
  constructor(
    @InjectRepository(Produk) private produkRepo: Repository<Produk>
  ){}
  create(createProdukDto: CreateProdukDto) {
    return this.produkRepo.save(createProdukDto);
  }

  findAll() {
    return this.produkRepo.find({relations:['user']});
  }

  findOne(id: number) {
    return this.produkRepo.findOne(id);
  }

  update(id: number, updateProdukDto: UpdateProdukDto) {
    updateProdukDto.id = id
    return this.produkRepo.save(updateProdukDto);
  }

  async remove(id: number) {
    let produk = await this.produkRepo.findOne(id)
    return this.produkRepo.remove(produk);
  }
}
