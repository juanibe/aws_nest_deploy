import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { Permission } from './models/permission.model';
import { GetOnePermissionInput, CreatePermissionInput, UpdatePermissionInput } from './dto/permissions.dto';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { Aplication } from '../aplications/models/aplication.model';

@Resolver(() => Permission)
export class PermissionResolver {
  constructor(private permissionService: PermissionsService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Permission])
  async getPermissions(): Promise<Permission[]> {
    return await this.permissionService.getAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Permission)
  async getOnePermission(@Args('input') data: GetOnePermissionInput): Promise<Permission> {
    return await this.permissionService.getOne(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async createPermission(@Args('input') data: CreatePermissionInput): Promise<string> {
    return await this.permissionService.create(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Permission)
  async updatePermission(@Args('permissionId') id: number, @Args('input') data: UpdatePermissionInput): Promise<Permission> {
    return await this.permissionService.update(id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async deletePermission(@Args('permissionId') data: number): Promise<string> {
    return await this.permissionService.deletePermission(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async inactivePermission(@Args('permissionId') data: number): Promise<string> {
    return await this.permissionService.toInactive(data);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Aplication])
  async getEcommercePermissions(@Args('ecommerceId') data: number): Promise<Aplication[]> {
    return await this.permissionService.getPermissions(data);
  }
}
