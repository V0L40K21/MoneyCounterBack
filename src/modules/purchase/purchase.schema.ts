import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {ApiProperty} from '@nestjs/swagger'
import {Document, Types} from 'mongoose'

import {Category} from '../category/category.schema'
import {PaymentMethod} from '../paymentMethod/payment.schema'
import {User} from '../user/user.schema'

@Schema({versionKey: false})
export class Purchase extends Document {
	@ApiProperty({
		description: 'Сумма',
		required: true,
		example: 5000
	})
	@Prop({type: Number, required: true})
	amount: number

	@ApiProperty({
		description: 'Пользователь',
		example: new Types.ObjectId()
	})
	@Prop({type: Types.ObjectId, ref: User.name})
	owner: Types.ObjectId

	@ApiProperty({
		description: 'Метод платежа',
		example: new Types.ObjectId()
	})
	@Prop({type: Types.ObjectId, ref: PaymentMethod.name})
	paymentMethod: Types.ObjectId

	@ApiProperty({
		description: 'Категория',
		example: new Types.ObjectId()
	})
	@Prop({type: Types.ObjectId, ref: Category.name})
	category: Types.ObjectId

	@ApiProperty({
		description: 'Пополнение/Затрата',
		example: 'inc'
	})
	@Prop({type: String, required: true})
	inOut: 'inc' | 'dec'

	@ApiProperty({description: 'Дата создания unix'})
	@Prop({type: Number})
	createdAt?: number

	@ApiProperty({description: 'Дата последнего изменения unix'})
	@Prop({type: Number})
	updatedAt?: number
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase)
