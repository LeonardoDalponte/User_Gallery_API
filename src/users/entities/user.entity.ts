import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class UserEntity implements User{
    id: number;

    @ApiProperty({
        example: 'leozaograndao',
    })
    name: string;

    @ApiProperty({
        example: 'leozaograndao@gmail.com',
    })
    email: string;


    @ApiProperty({
        example: 'dadadadad',
    })
    password: string;



    dt_created: Date;


}
