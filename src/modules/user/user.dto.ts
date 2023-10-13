import {OmitType, PartialType} from '@nestjs/swagger'

import {User} from './user.schema'

export class PartialUser extends PartialType(User) {}
export class CreateUserDto extends OmitType(User, ['updatedAt', 'createdAt'] as const) {}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
