import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { databaseConfig } from './config/database';
import { AplicationsModule } from './modules/aplications/aplications.module';
import { ClientsModule } from './modules/clients/clients.module';
import { EcommercesModule } from './modules/ecommerces/ecommerces.module';
import { LocationModule } from './modules/locations/location.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ req })
    }),
    TypeOrmModule.forRoot({
      type: databaseConfig.type,
      host: databaseConfig.host,
      port: databaseConfig.port,
      username: databaseConfig.user,
      password: databaseConfig.password,
      database: databaseConfig.name,
      synchronize: true,
      autoLoadEntities: true
    }),
    AuthModule,
    UsersModule,
    AplicationsModule,
    ClientsModule,
    EcommercesModule,
    LocationModule,
    PermissionsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  constructor(private connection: Connection) {}
}
