import {
  BadRequestException,
  ConflictException,
    ExecutionContext,
    HttpException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { ExternalExceptionFilterContext } from '@nestjs/core/exceptions/external-exception-filter-context';
  import { AuthGuard } from '@nestjs/passport';
  
  @Injectable()
  export class LocalAuthGuard extends AuthGuard('local') {
    canActivate(context: ExecutionContext) {
      return super.canActivate(context);
    }
  
    handleRequest(err, user) {
      if (err || !user) {
        throw new BadRequestException("deu erro");
      }
      return user;
    }
  }