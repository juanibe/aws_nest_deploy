import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { LocationService } from './location.service';
import { Country } from './models/country.model';
import { GetOneCountryInput, CreateCountryInput, UpdateCountryInput } from './dto/country.dto';
import { GetOneCityInput, CreateCityInput, UpdateCityInput } from './dto/city.dto';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { City } from './models/city.model';

@Resolver()
export class LocationResolver {
  constructor(private locationService: LocationService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Country])
  async getCountries(): Promise<Country[]> {
    return await this.locationService.getAllCountries();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Country)
  async getOneCountry(@Args('input') data: GetOneCountryInput): Promise<Country> {
    return await this.locationService.getOneCountry(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async createCountry(@Args('input') data: CreateCountryInput): Promise<string> {
    return await this.locationService.createCountry(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Country)
  async updateCountry(@Args('countryId') id: number, @Args('input') data: UpdateCountryInput): Promise<Country> {
    return await this.locationService.updateCountry(id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async deleteCountry(@Args('countryId') data: number): Promise<string> {
    return await this.locationService.deleteCountry(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async inactiveCountry(@Args('countryId') data: number): Promise<string> {
    return await this.locationService.toInactiveCountry(data);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [City])
  async getCities(): Promise<City[]> {
    return await this.locationService.getAllCities();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => City)
  async getOneCity(@Args('input') data: GetOneCityInput): Promise<City> {
    return await this.locationService.getOneCity(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async createCity(@Args('input') data: CreateCityInput): Promise<string> {
    return await this.locationService.createCity(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => City)
  async updateCity(@Args('countryId') id: number, @Args('input') data: UpdateCityInput): Promise<Country> {
    return await this.locationService.updateCity(id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async deleteCity(@Args('countryId') data: number): Promise<string> {
    return await this.locationService.deleteCity(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async inactiveCity(@Args('countryId') data: number): Promise<string> {
    return await this.locationService.toInactiveCity(data);
  }
}
