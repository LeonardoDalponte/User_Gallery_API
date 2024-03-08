import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { Router } from 'express';
import { CurrentUser } from 'src/users/decorators/current-user-decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ImgService } from './img.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';




const imgRoutes = Router()
@ApiConsumes('multipart/form-data')
@ApiTags("images")
@Controller('img')
export class ImgController {
  constructor(private readonly imgService: ImgService, readonly jwtService: JwtService) { }

  @ApiResponse({
    status: 200, description: "OK",
  })
  @ApiResponse({
    status: 400, description: "error in upload image",
  })
  @ApiBearerAuth()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { 
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  handleUpload(@CurrentUser() user: UserEntity, @UploadedFile() file: Express.Multer.File, id) {
    if (file) {
      return this.imgService.create(file, id, user)
    }
    return new Error("erro")

  }


  @ApiResponse({
    status: 200, description: "OK",
  })
  @ApiResponse({
    status: 400, description: "error in get image",
  })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return this.imgService.findOne(user, +id);
  }



  @ApiResponse({
    status: 200, description: "OK",
  })
  @ApiResponse({
    status: 400, description: "error in get images",
  })
  @ApiBearerAuth()
  @Get()
  findAll(@CurrentUser() user: UserEntity) {
    return this.imgService.findAll(user);
  }


  @ApiResponse({
    status: 200, description: "OK",
  })
  @ApiResponse({
    status: 400, description: "error in deleted image",
  })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return this.imgService.remove(+id, user);
  }
}
