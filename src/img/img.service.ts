import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { ImgRepository } from './repository/img.repository';
import { Image } from '@prisma/client';

@Injectable()
export class ImgService {
  constructor(readonly repository: ImgRepository) { }

  async create(file: Express.Multer.File, id, user: UserEntity) {
    return await this.repository.create(file, id, user)
  }

  findAll(user:UserEntity) {
    return this.repository.findAll(user)
  }

  findOne(user: UserEntity,id:number) {
    return this.repository.findOne(user,id);
  }

  remove(id: number,user:UserEntity) {
    return this.repository.delete(id,user);
  }



}


