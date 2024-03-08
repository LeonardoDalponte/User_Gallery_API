import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { AuthRequest } from '../Models/Auth.Request';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserEntity => {
    const request = context.switchToHttp().getRequest<AuthRequest>();
                  
    return request.user;
  },
);