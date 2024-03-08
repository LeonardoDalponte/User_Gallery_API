import { ApiProperty } from "@nestjs/swagger";
import { IS_LENGTH, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";


export class CreateUserDto {
    
    @ApiProperty({
        example: 'leozaograndao',
    })
    
    @IsString()
    @IsNotEmpty()
    @Length(5,20)
    name: string


    @ApiProperty({
        example: 'adadadadadada',
    })
    @IsString()
    @IsNotEmpty()
    @Length(5,20)
    password: string



    @ApiProperty({
        example: 'leozaograndao@gmail.com',
    })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string
}