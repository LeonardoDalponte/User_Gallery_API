import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaService } from 'src/prisma/prismaService';
import { ImgController } from './img.controller';
import { ImgService } from './img.service';
import { ImgRepository } from './repository/img.repository';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { userRepository } from 'src/users/repositories/userRepository';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [MulterModule.register({
    dest: './uploads'
  }),
  ],
  controllers: [ImgController],
  providers: [ImgService, PrismaService, ImgRepository, JwtService],
})
export class ImgModule { }
