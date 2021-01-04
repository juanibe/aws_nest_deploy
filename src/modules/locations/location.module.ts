import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './models/country.model';
import { City } from './models/city.model';
import { LocationResolver } from './location.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Country, City])],
  providers: [LocationService, LocationResolver]
})
export class LocationModule {}
