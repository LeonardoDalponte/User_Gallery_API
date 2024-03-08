import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userRepository } from './repositories/userRepository';
import { PrismaService } from 'src/prisma/prismaService';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret123',
      signOptions: { expiresIn: '7d', algorithm: 'HS256' },

    })
  ],
  controllers: [UsersController],
  providers: [UsersService, userRepository, PrismaService, JwtStrategy, LocalStrategy]
})
export class UsersModule { }
