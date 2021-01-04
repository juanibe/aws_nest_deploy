import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EcommerceResolver } from './ecommerces.resolver';
import { EcommercesService } from './ecommerces.service';
import { Ecommerce } from './models/ecommerce.model';
@Module({
  imports: [TypeOrmModule.forFeature([Ecommerce])],
  providers: [EcommercesService, EcommerceResolver]
})
export class EcommercesModule {}
