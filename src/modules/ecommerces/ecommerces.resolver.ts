import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { EcommercesService } from './ecommerces.service';
import { Ecommerce } from './models/ecommerce.model';
import { GetOneEcommerceInput, CreateEcommerceInput, UpdateEcommerceInput } from './dto/ecommerces.dto';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver(() => Ecommerce)
export class EcommerceResolver {
  constructor(private ecommerceService: EcommercesService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Ecommerce])
  async getEcommerces(): Promise<Ecommerce[]> {
    return await this.ecommerceService.getAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Ecommerce)
  async getOneEcommerce(@Args('input') data: GetOneEcommerceInput): Promise<Ecommerce> {
    return await this.ecommerceService.getOne(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async createEcommerce(@Args('input') data: CreateEcommerceInput): Promise<string> {
    return await this.ecommerceService.create(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Ecommerce)
  async updateEcommerce(@Args('ecommercetId') id: number, @Args('input') data: UpdateEcommerceInput): Promise<Ecommerce> {
    return await this.ecommerceService.update(id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async deleteEcommerce(@Args('ecommerceId') data: number): Promise<string> {
    return await this.ecommerceService.deleteEcommerce(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async inactiveEcommerce(@Args('ecommerceId') data: number): Promise<string> {
    return await this.ecommerceService.toInactive(data);
  }
}
