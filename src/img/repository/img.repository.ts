
import { BadRequestException, Injectable } from "@nestjs/common";
import { Image } from "@prisma/client";
import * as fs from 'fs';
import path from "path";
import { PrismaService } from "src/prisma/prismaService";
import { UserEntity } from "src/users/entities/user.entity";

@Injectable()
export class ImgRepository {
    constructor(readonly prisma: PrismaService) { }

    async create(file: Express.Multer.File, id, user: UserEntity) {


        const { originalname, size, filename } = file

        if (!file) {
            throw new BadRequestException("erro no upload")
        }

        try {

            const image = this.prisma.image.create({
                data: {
                    imageName: originalname,
                    imageSize: size,
                    imageStored: filename,
                    authorId: user.id
                }

            })

            if (!image) {
                throw new BadRequestException("erro no upload")
            }

            if ((await image).imageName == "" || (await image).imageName == null) { throw new BadRequestException("erro no upload") }

            return image
        } catch (err) {
            throw new BadRequestException("erro no upload")
        }
    }



    async findAll(user: UserEntity) {

        const images = await this.prisma.image.findMany({
            where: { authorId: user.id }
        })

        const b64Files = images.map((item) => {
            return this.toB64(item);
        });

        if (!images) {
            throw new Error("erro")
        }

        return b64Files


    }

    async findOne(user: UserEntity, id: number) {
        try {

            const image = this.prisma.image.findFirst({
                where: {
                    authorId: user.id,
                    imageId: id
                }
            })

            if (!image) {
                throw new BadRequestException("error in get image")
            }

            const base64files = this.toB64((await image))


            return base64files
        } catch (err) {
            throw new BadRequestException("error in get image")
        }
    }



    async delete(id: number, user: UserEntity) {

        try {

            const imagem = await this.prisma.image.delete({
                where: {
                    imageId: id,
                    authorId: user.id
                }
            })

            if (!imagem) {
                throw new BadRequestException("error in remove image")
            }

            return imagem

        } catch (err) {
            throw new BadRequestException("error in remove image")
        }
    }

    toB64(image: Image) {
        const b64File = fs.readFileSync(`uploads/${image.imageStored}`, "base64");
        const b64Object = {
            ...image,
            b64File
        }

        return b64Object
    }



}

