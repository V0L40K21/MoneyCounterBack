import {OmitType, PartialType, PickType} from '@nestjs/swagger'

import {PaymentMethod} from './payment.schema'

export class PartialPaymentMethod extends PartialType(PaymentMethod) {}
export class CreatePaymentMethodDto extends OmitType(PaymentMethod, [
	'updatedAt',
	'createdAt'
] as const) {}
export class FindPaymentMethodDto extends PickType(PartialPaymentMethod, [
	'_id'
]) {}
export class DeletePaymentMethodDto extends PickType(
	PartialPaymentMethod,
	['_id']
) {}
export class UpdatePaymentMethodDto extends OmitType(PaymentMethod, [
	'createdAt'
] as const) {}
