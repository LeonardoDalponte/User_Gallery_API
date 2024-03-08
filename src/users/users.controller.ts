import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsPublic } from './decorators/IS_PUBLIC_KEY';
import { CurrentUser } from './decorators/current-user-decorator';
import { CreateUserDto } from './dto/CreateUser.Dto';
import { LoginUserDto } from './dto/LoginUserDto';
import { ReturnLogin } from './dto/returnLogin.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { LocalAuthGuard } from './guards/local.guard';
import { UsersService } from './users.service';

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @ApiResponse({
    status: 200, description: "OK",
  })
  @ApiResponse({
    status: 400, description: "badRequest",
  })
  @ApiResponse({
    status: 409, description: "User Exists",
  })
  @IsPublic()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    
    if(!user){
      throw new BadRequestException("erro")
    }
    return user
  }


  @ApiResponse({
    status: 200, description: "OK",
  })
  @ApiResponse({
    status: 400, description: "deu erro",
  })
  @UseGuards(LocalAuthGuard)
  @IsPublic()
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<ReturnLogin> {
    return await this.usersService.login(loginUserDto)
  }



  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiResponse({
    status: 200, description: "OK",
  })
  @ApiResponse({
    status: 401, description: "precisa estar logado",
  })
  @ApiResponse({
    status: 409, description: "User not exists",
  })
  @ApiBearerAuth()
  @Get('me')
  getme(@CurrentUser() user: User) {
    this.usersService.getMe(user)
    return user;
  }


  @ApiResponse({
    status: 200, description: "OK",
  })
  @ApiResponse({
    status: 401, description: "precisa estar logado",
  })
  @ApiResponse({
    status: 409, description: "User not exists",
  })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }



  @ApiResponse({
    status: 200, description: "OK",
  })
  @ApiResponse({
    status: 401, description: "precisa estar logado",
  })
  @ApiResponse({
    status: 409, description: "User not exists",
  })
  @ApiBearerAuth()
  @Put(':id')
  update(@Param('id') id: string, @CurrentUser() user: UserEntity, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto, user);
  }


  @ApiResponse({
    status: 200, description: "OK",
  })
  @ApiResponse({
    status: 401, description: "precisa estar logado",
  })
  @ApiResponse({
    status: 409, description: "User not exists",
  })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number,@CurrentUser() user:UserEntity) {
    return this.usersService.remove(id,user); // por que esta convertendo???? arruma essa merda ai
  }


}

