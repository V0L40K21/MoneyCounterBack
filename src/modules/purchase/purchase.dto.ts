import {OmitType, PartialType, PickType} from '@nestjs/swagger'

import {Purchase} from './purchase.schema'
import {PaymentMethod} from '../paymentMethod/payment.schema'
import {Category} from '../category/category.schema'
import {User} from '../user/user.schema'

export class PartialPurchase extends PartialType(Purchase) {}
export class CreatePurchaseDto extends OmitType(Purchase, [
	'updatedAt',
	'createdAt'
] as const) {}
export class FindPurchaseDto extends PickType(PartialPurchase, ['_id']) {}
export class DeletePurchaseDto extends PickType(PartialPurchase, [
	'_id'
]) {}
export class UpdatePurchaseDto extends OmitType(Purchase, [
	'createdAt'
] as const) {}

export const purchasePopulate = [
	{
		path: 'owner',
		select: ['_id', 'email'],
		model: User.name
	},
	{
		path: 'paymentMethod',
		select: ['name', 'balance'],
		model: PaymentMethod.name
	},
	{
		path: 'category',
		select: ['name'],
		model: Category.name
	}
]
