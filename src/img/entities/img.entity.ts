import { ApiProperty } from "@nestjs/swagger";
import { Image } from "@prisma/client";

export class imgEntity implements Image {

    imageId: number;
    imageName: string;
    imageStored: string;
    dt_created: Date;
    imageSize: number;
    authorId: number;

}