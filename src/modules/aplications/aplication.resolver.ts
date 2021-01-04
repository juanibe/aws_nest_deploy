import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AplicationsService } from './aplications.service';
import { Aplication } from './models/aplication.model';
import { GetOneAplicationInput, CreateAplicationInput, UpdateAplicationInput } from './dto/aplication.dto';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver(() => Aplication)
export class AplicationResolver {
  constructor(private aplicationService: AplicationsService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Aplication])
  async getAplications(): Promise<Aplication[]> {
    return await this.aplicationService.getAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Aplication)
  async getOneAplication(@Args('input') data: GetOneAplicationInput): Promise<Aplication> {
    return await this.aplicationService.getOne(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async createAplication(@Args('input') data: CreateAplicationInput): Promise<string> {
    return await this.aplicationService.create(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Aplication)
  async updateAplication(@Args('aplicationId') id: number, @Args('input') data: UpdateAplicationInput): Promise<Aplication> {
    return await this.aplicationService.update(id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async deleteAplication(@Args('aplicationId') data: number): Promise<string> {
    return await this.aplicationService.deleteAplication(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async inactiveAplication(@Args('aplicationId') data: number): Promise<string> {
    return await this.aplicationService.toInactive(data);
  }
}
