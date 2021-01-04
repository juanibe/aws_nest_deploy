import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aplication } from './models/aplication.model';
import { GetOneAplicationInput, CreateAplicationInput, UpdateAplicationInput } from './dto/aplication.dto';

@Injectable()
export class AplicationsService {
  constructor(
    @InjectRepository(Aplication)
    private aplicationRepository: Repository<Aplication>
  ) {}

  getAll = async (): Promise<Aplication[]> => {
    try {
      const aplications = await this.aplicationRepository.find();
      return aplications;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  getOne = async (data: GetOneAplicationInput): Promise<Aplication | undefined> => {
    const { id } = data;
    try {
      const aplication = await this.aplicationRepository.findOne({ where: { id } });
      return aplication;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  create = async (data: CreateAplicationInput): Promise<string> => {
    try {
      const aplication = this.aplicationRepository.create(data);
      await aplication.save();
      return 'Aplication created';
    } catch (error) {
      throw new Error(error.message);
    }
  };

  update = async (id: number, data: UpdateAplicationInput): Promise<Aplication | undefined> => {
    try {
      await this.aplicationRepository.update(id, { ...data });
      const aplication = await this.aplicationRepository.findOne(id);
      return aplication;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  deleteAplication = async (id: number): Promise<string> => {
    try {
      await this.aplicationRepository.delete(id);
      return `Aplication deleted`;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  toInactive = async (id: number): Promise<string> => {
    try {
      const aplication = await this.aplicationRepository.findOne(id);
      aplication.active = false;
      await aplication.save();
      return `Aplication change to inactive`;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
