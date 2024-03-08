import { LoginUserDto } from "./LoginUserDto";
import { ReturnUserDto } from "./ReturnUserDto";

export interface ReturnLogin{
    user:ReturnUserDto;
    acessToken:string;
}   