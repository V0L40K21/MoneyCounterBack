import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {ApiProperty} from '@nestjs/swagger'
import {Document, Types} from 'mongoose'

import {User} from '../user/user.schema'

@Schema({versionKey: false})
export class Category extends Document {
	@ApiProperty({
		description: 'Название категории',
		required: true,
		example: 'Еда'
	})
	@Prop({type: String, required: true, unique: true})
	name: string

	@ApiProperty({
		description: 'Пользователь',
		example: new Types.ObjectId()
	})
	@Prop({type: Types.ObjectId, ref: User.name})
	owner: Types.ObjectId

	@ApiProperty({description: 'Дата создания unix'})
	@Prop({type: Number})
	createdAt?: number

	@ApiProperty({description: 'Дата последнего изменения unix'})
	@Prop({type: Number})
	updatedAt?: number
}

export const CategorySchema = SchemaFactory.createForClass(Category)
