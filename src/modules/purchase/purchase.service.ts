import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model, Types} from 'mongoose'
const dayjs = require('dayjs')

import {PaymentMethodService} from '../paymentMethod/payment.service'
import {CreatePurchaseDto, purchasePopulate} from './purchase.dto'
import {Purchase} from './purchase.schema'

@Injectable()
export class PurchaseService {
	constructor(
		@InjectModel(Purchase.name)
		private readonly purchaseModel: Model<Purchase>,
		private readonly paymentMethodsService: PaymentMethodService
	) {}

	async decrement(dto: CreatePurchaseDto) {
		try {
			await this.paymentMethodsService.decrement({
				_id: dto.paymentMethod,
				sum: dto.amount
			})
			return await this.purchaseModel.create({
				...dto,
				createdAt: dayjs().unix()
			})
		} catch (error) {
			throw new HttpException(
				error.response ?? error,
				error.status ?? HttpStatus.BAD_REQUEST
			)
		}
	}

	async increment(dto: CreatePurchaseDto) {
		try {
			await this.paymentMethodsService.increment({
				_id: dto.paymentMethod,
				sum: dto.amount
			})
			return await this.purchaseModel.create({
				...dto,
				createdAt: dayjs().unix()
			})
		} catch (error) {
			throw new HttpException(
				error.response ?? error,
				error.status ?? HttpStatus.BAD_REQUEST
			)
		}
	}

	async find(owner: Types.ObjectId, dateRange: string[]) {
		try {
			const from = dayjs(dateRange[0]).startOf('D').unix()
			const to = dayjs(dateRange[1]).endOf('D').unix()
			return await this.purchaseModel
				.find({owner, createdAt: {$gte: from, $lte: to}})
				.populate(purchasePopulate)
		} catch (error) {
			throw new HttpException(
				error.response ?? error,
				error.status ?? HttpStatus.BAD_REQUEST
			)
		}
	}
}
