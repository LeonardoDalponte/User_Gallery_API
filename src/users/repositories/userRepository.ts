import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { error } from 'console';
import { PrismaService } from 'src/prisma/prismaService';
import { CreateUserDto } from '../dto/CreateUser.Dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';


@Injectable()
export class userRepository {

    constructor(readonly prisma: PrismaService) { }

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        const { password, name, email } = createUserDto

        const saltOrRounds = 10;
        const passwordHash = bcrypt.hashSync(password, saltOrRounds)

        try {

            const user = await this.prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: passwordHash,
                }
            })

            if (!user) {
                throw new BadRequestException({ message: "bad request" })
            }

            delete user.password
            return user
        } catch (err) {
            throw new BadRequestException("erro ao cadastrar")
        }
    }

    async findAll() {

        const users = await this.prisma.user.findMany();
        const usersSemSenha = users.map(user => {
            const { password, ...userSemSenha } = user
            return userSemSenha
        })
        return usersSemSenha
    }



    async findOne(id: number): Promise<UserEntity> {


        const user = await this.prisma.user.findUnique({
            where: { id: id }
        })

        if (!user) {
            return new error({ status: 400, message: "not found" })
        }
        delete user.password
        return user
    }

    async update(id: number, updateUserDto: UpdateUserDto, user: UserEntity): Promise<UserEntity> {
        const { name, email, password } = updateUserDto
        const hashPassword = bcrypt.hashSync(password, 10)

        try {
            if (id != user.id) {
                throw new BadRequestException("id incorreto")
            } else {

                const userUpdate = await this.prisma.user.update({
                    where: {
                        id: id

                    },
                    data: {
                        name: name,
                        email: email,
                        password: hashPassword
                    }
                })

                if (!userUpdate) {
                    throw new BadRequestException("bad request")
                }
                delete userUpdate.password
                return userUpdate
            }
        } catch (err) {
            throw new BadRequestException("erro")
        }

    }

    async remove(id: number): Promise<UserEntity> {
        try {
            const user = await this.prisma.user.delete({
                where: { id: id }
            })

            if (!user) {
                throw new BadRequestException("bad request")
            }

            delete user.password
            return user

        } catch (err) {
            throw new BadRequestException("erro")
        }
    }

    findByEmail(email: string) {
        return this.prisma.user.findFirst({
            where: { email: email }
        })
    }

    getMe(user: User) {
        const userUnique = this.prisma.user.findUnique({
            where: {
                id: user.id
            }
        })
        if (!userUnique) {
            return new error({ status: 400, message: "bad request" })
        }
        return userUnique
    }
}
