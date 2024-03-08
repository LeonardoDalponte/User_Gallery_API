import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './CreateUser.Dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
