import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './models/client.model';
import { GetOneClientInput, CreateClientInput, UpdateClientInput } from './dto/clients.dto';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver(() => Client)
export class ClientResolver {
  constructor(private clientService: ClientsService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Client])
  async getClients(): Promise<Client[]> {
    return await this.clientService.getAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Client)
  async getOneClient(@Args('input') data: GetOneClientInput): Promise<Client> {
    return await this.clientService.getOne(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async createClient(@Args('input') data: CreateClientInput): Promise<string> {
    return await this.clientService.create(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Client)
  async updateClient(@Args('clientId') id: number, @Args('input') data: UpdateClientInput): Promise<Client> {
    return await this.clientService.update(id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async deleteClient(@Args('clientId') data: number): Promise<string> {
    return await this.clientService.deleteClient(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async inactiveClient(@Args('clientId') data: number): Promise<string> {
    return await this.clientService.toInactive(data);
  }
}
