import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './models/country.model';
import { GetOneCountryInput, CreateCountryInput, UpdateCountryInput } from './dto/country.dto';
import { GetOneCityInput, CreateCityInput, UpdateCityInput } from './dto/city.dto';
import { City } from './models/city.model';
@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
    @InjectRepository(City)
    private cityRepository: Repository<City>
  ) {}

  getAllCountries = async (): Promise<Country[]> => {
    try {
      const countries = await this.countryRepository.find();
      return countries;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  getOneCountry = async (data: GetOneCountryInput): Promise<Country | undefined> => {
    const { id } = data;
    try {
      const country = await this.countryRepository.findOne({ where: { id } });
      return country;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  createCountry = async (data: CreateCountryInput): Promise<string> => {
    try {
      const country = this.countryRepository.create(data);
      await country.save();
      return 'Country created';
    } catch (error) {
      throw new Error(error.message);
    }
  };

  updateCountry = async (id: number, data: UpdateCountryInput): Promise<Country | undefined> => {
    try {
      await this.countryRepository.update(id, { ...data });
      const country = await this.countryRepository.findOne(id);
      return country;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  deleteCountry = async (id: number): Promise<string> => {
    try {
      await this.countryRepository.delete(id);
      return `Country deleted`;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  toInactiveCountry = async (id: number): Promise<string> => {
    try {
      const country = await this.countryRepository.findOne(id);
      country.active = false;
      await country.save();
      return `Country change to inactive`;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getAllCities = async (): Promise<City[]> => {
    try {
      const cities = await this.cityRepository.find();
      return cities;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  getOneCity = async (data: GetOneCityInput): Promise<City | undefined> => {
    const { id } = data;
    try {
      const city = await this.cityRepository.findOne({ where: { id } });
      return city;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  createCity = async (data: CreateCityInput): Promise<string> => {
    try {
      await this.cityRepository.insert({ ...data });
      return 'City created';
    } catch (error) {
      throw new Error(error.message);
    }
  };

  updateCity = async (id: number, data: UpdateCityInput): Promise<Country | undefined> => {
    try {
      await this.cityRepository.update(id, { ...data });
      const city = await this.cityRepository.findOne(id);
      return city;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  deleteCity = async (id: number): Promise<string> => {
    try {
      await this.cityRepository.delete(id);
      return `City deleted`;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  toInactiveCity = async (id: number): Promise<string> => {
    try {
      const city = await this.cityRepository.findOne(id);
      city.active = false;
      await city.save();
      return `City change to inactive`;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
