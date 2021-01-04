import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { tokenConfig } from '../../config/token';
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: tokenConfig.secretKey,
      signOptions: { expiresIn: tokenConfig.expirationDay }
    })
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService]
})
export class AuthModule {}
