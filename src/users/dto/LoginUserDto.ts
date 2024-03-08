import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length } from "class-validator"


export class LoginUserDto {

    @ApiProperty({
        example: 'leozin@gmail.com',
    })
    @IsString()
    @IsNotEmpty()
    email: string

    @ApiProperty({
        example: 'adadadadadada',
    })
    @IsString()
    @IsNotEmpty()
    password: string
}
