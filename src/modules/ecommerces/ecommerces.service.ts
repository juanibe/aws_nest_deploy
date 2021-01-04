import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ecommerce } from './models/ecommerce.model';
import { GetOneEcommerceInput, CreateEcommerceInput, UpdateEcommerceInput } from './dto/ecommerces.dto';
@Injectable()
export class EcommercesService {
  constructor(
    @InjectRepository(Ecommerce)
    private ecommerceRepository: Repository<Ecommerce>
  ) {}

  getAll = async (): Promise<Ecommerce[]> => {
    try {
      const ecommerces = await this.ecommerceRepository.find();
      return ecommerces;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  getOne = async (data: GetOneEcommerceInput): Promise<Ecommerce | undefined> => {
    const { id } = data;
    try {
      const ecommerce = await this.ecommerceRepository.findOne({ where: { id } });
      return ecommerce;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  create = async (data: CreateEcommerceInput): Promise<string> => {
    try {
      await this.ecommerceRepository.insert({ ...data });
      return 'Ecommerce created';
    } catch (error) {
      throw new Error(error.message);
    }
  };

  update = async (id: number, data: UpdateEcommerceInput): Promise<Ecommerce | undefined> => {
    try {
      await this.ecommerceRepository.update(id, { ...data });
      const ecommerce = await this.ecommerceRepository.findOne(id);
      return ecommerce;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  deleteEcommerce = async (id: number): Promise<string> => {
    try {
      await this.ecommerceRepository.delete(id);
      return `Ecommerce deleted`;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  toInactive = async (id: number): Promise<string> => {
    try {
      const ecommerce = await this.ecommerceRepository.findOne(id);
      ecommerce.active = false;
      await ecommerce.save();
      return `Ecommerce change to inactive`;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
