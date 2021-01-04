import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './models/client.model';
import { GetOneClientInput, CreateClientInput, UpdateClientInput } from './dto/clients.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>
  ) {}

  getAll = async (): Promise<Client[]> => {
    try {
      const aplications = await this.clientRepository.find();
      return aplications;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  getOne = async (data: GetOneClientInput): Promise<Client | undefined> => {
    const { id } = data;
    try {
      const aplication = await this.clientRepository.findOne({ where: { id } });
      return aplication;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  create = async (data: CreateClientInput): Promise<string> => {
    try {
      const aplication = this.clientRepository.create(data);
      await aplication.save();
      return 'Client created';
    } catch (error) {
      throw new Error(error.message);
    }
  };

  update = async (id: number, data: UpdateClientInput): Promise<Client | undefined> => {
    try {
      await this.clientRepository.update(id, { ...data });
      const aplication = await this.clientRepository.findOne(id);
      return aplication;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  deleteClient = async (id: number): Promise<string> => {
    try {
      await this.clientRepository.delete(id);
      return `Client deleted`;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  toInactive = async (id: number): Promise<string> => {
    try {
      const aplication = await this.clientRepository.findOne(id);
      aplication.active = false;
      await aplication.save();
      return `Client change to inactive`;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
