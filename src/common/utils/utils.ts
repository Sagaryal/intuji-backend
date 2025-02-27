import { plainToInstance, ClassConstructor } from 'class-transformer';

export function transformToDto<T, V>(cls: ClassConstructor<T>, obj: V[]): T[];
export function transformToDto<T, V>(cls: ClassConstructor<T>, obj: V): T;
export function transformToDto<T, V>(cls: ClassConstructor<T>, obj: V | V[]): T | T[] {
  return plainToInstance(cls, obj, { excludeExtraneousValues: true });
}
