import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { UserPayload } from './Models/UsersPayload';
import { CreateUserDto } from './dto/CreateUser.Dto';
import { LoginPayload } from './dto/LoginPayload.dto';
import { LoginUserDto } from './dto/LoginUserDto';
import { ReturnUserDto } from './dto/ReturnUserDto';
import { ReturnLogin } from './dto/returnLogin.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { userRepository } from './repositories/userRepository';
import { error } from 'console';


@Injectable()
export class UsersService {
  constructor(readonly repository: userRepository, private jwtService: JwtService) { }

  create(createUserDto: CreateUserDto) {
    return this.repository.create(createUserDto)
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto, user: UserEntity) {
    return this.repository.update(id, updateUserDto, user);
  }

  remove(id: number, user: UserEntity) {
    try {
      if (id != user.id) {
        throw new BadRequestException("erro")
      }
      return this.repository.remove(id);
      
    } catch (err) {
      throw new BadRequestException("erro")
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<ReturnLogin> {
    const user = await this.repository.findByEmail(loginUserDto.email)
    const userLogado = bcrypt.compareSync(loginUserDto.password, user.password)

    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name
    }

    const jwtToken = this.jwtService.sign(payload)

    if (!jwtToken) {
      return new error({ status: 409, message: "bad request" })
    }

    if (userLogado) {

      let userPayload = new LoginPayload(user);
      delete user.password
      return {

        acessToken: jwtToken,
        user: new ReturnUserDto(user),
      };
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.repository.findByEmail(email)

    if (!user) {
      return new error({ status: 400, message: "erro" })
    }

    if (user) {
      //checar se a senha informada corresponde a hash que esta no banco

      const passwordIsValid = bcrypt.compare(password, user.password)

      if (passwordIsValid) {
        return {
          ...user,
          password: undefined,
        }
      }
    }

    return new error({ status: 400 })
  }

  getMe(user: User) {
    this.repository.getMe(user)
  }
}


