import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './models/permission.model';
import { GetOnePermissionInput, CreatePermissionInput, UpdatePermissionInput } from './dto/permissions.dto';
import { Aplication } from '../aplications/models/aplication.model';
@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>
  ) {}

  getAll = async (): Promise<Permission[]> => {
    try {
      const permissions = await this.permissionRepository.find();
      return permissions;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  getOne = async (data: GetOnePermissionInput): Promise<Permission | undefined> => {
    const { id } = data;
    try {
      const permission = await this.permissionRepository.findOne({ where: { id } });
      return permission;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  create = async (data: CreatePermissionInput): Promise<string> => {
    try {
      await this.permissionRepository.insert({ ...data });
      return 'Permission created';
    } catch (error) {
      throw new Error(error.message);
    }
  };

  update = async (id: number, data: UpdatePermissionInput): Promise<Permission | undefined> => {
    try {
      await this.permissionRepository.update(id, { ...data });
      const permission = await this.permissionRepository.findOne(id);
      return permission;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  deletePermission = async (id: number): Promise<string> => {
    try {
      await this.permissionRepository.delete(id);
      return `Permission deleted`;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  toInactive = async (id: number): Promise<string> => {
    try {
      const permission = await this.permissionRepository.findOne(id);
      permission.active = false;
      await permission.save();
      return `Permission change to inactive`;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getPermissions = async (ecommerceId: number): Promise<Aplication[]> => {
    try {
      const permissions = await this.permissionRepository.find({ where: { ecommerce: ecommerceId } });
      const aplications = permissions.map((data) => data.aplication);
      return aplications;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
