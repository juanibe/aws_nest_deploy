import { Module } from '@nestjs/common';
import { AplicationResolver } from './aplication.resolver';
import { AplicationsService } from './aplications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aplication } from './models/aplication.model';

@Module({
  imports: [TypeOrmModule.forFeature([Aplication])],
  providers: [AplicationsService, AplicationResolver]
})
export class AplicationsModule {}
