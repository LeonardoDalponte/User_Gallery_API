import { SetMetadata } from '@nestjs/common';

//Set meta Data para criar decorators customizados

export const IS_PUBLIC_KEY = 'isPublic';
export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);