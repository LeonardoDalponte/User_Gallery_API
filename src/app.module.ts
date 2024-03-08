import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ImgModule } from './img/img.module';
import { RolesGuard } from './users/guards/roles.guard';
import { UsersModule } from './users/users.module';



@Module({
  imports: [UsersModule, JwtModule, ImgModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class AppModule { }
