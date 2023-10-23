import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Req
} from '@nestjs/common'
import {ApiOperation} from '@nestjs/swagger'
import {Types} from 'mongoose'

import {
	CreatePaymentMethodDto,
	UpdatePaymentMethodDto
} from './payment.dto'
import {PaymentMethodService} from './payment.service'

@Controller('/payment')
export class PaymentMethodController {
	constructor(private paymentService: PaymentMethodService) {}

	@Post('/')
	@ApiOperation({summary: 'Создание способа платежа'})
	async createPaymentMethod(
		@Body() dto: CreatePaymentMethodDto,
		@Req() req: any
	) {
		return await this.paymentService.create({...dto, owner: req.user?._id})
	}

	@Get('/')
	@ApiOperation({summary: 'Получение всех способов платежа'})
	async findPaymentMethods(@Req() req: any) {
		return await this.paymentService.find(req.user?._id)
	}

	@Patch('/:_id')
	@ApiOperation({summary: 'Изменение способа платежа'})
	async updatePaymentMethod(
		@Body() dto: UpdatePaymentMethodDto,
		@Param('_id') _id: string
	) {
		return await this.paymentService.update({_id, ...dto})
	}

	@Delete('/:_id')
	@ApiOperation({summary: 'Удаление способа платежа'})
	async deletePaymentMethod(
		@Param('_id') _id: Types.ObjectId,
		@Req() req: any
	) {
		return await this.paymentService.delete({_id, owner: req.user?._id})
	}
}
