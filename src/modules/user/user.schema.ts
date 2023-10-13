import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {ApiProperty} from '@nestjs/swagger'
import {Document} from 'mongoose'

@Schema({versionKey: false})
export class User extends Document {
	@ApiProperty({
		description: 'Email пользователя',
		required: true,
		example: 'qwe@gmail.com'
	})
	@Prop({type: String, required: true, unique: true})
	email: string

	@ApiProperty({description: 'Пароль пользователя', required: true})
	@Prop({type: String, required: true})
	password: string

	@ApiProperty({description: 'Дата создания unix'})
	@Prop({type: Number})
	createdAt?: number

	@ApiProperty({description: 'Дата последнего изменения unix'})
	@Prop({type: Number})
	updatedAt?: number
}

export const UserSchema = SchemaFactory.createForClass(User)
