import {
	HttpException,
	HttpStatus,
	Inject,
	Injectable,
	NotFoundException,
	forwardRef
} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
const dayjs = require('dayjs')
import {Model} from 'mongoose'

import {User} from '../user/user.schema'
import {
	CreatePaymentMethodDto,
	DeletePaymentMethodDto,
	FindPaymentMethodDto,
	PartialPaymentMethod,
	UpdatePaymentMethodDto
} from './payment.dto'
import {PaymentMethod} from './payment.schema'
import {PurchaseService} from '../purchase/purchase.service'

@Injectable()
export class PaymentMethodService {
	constructor(
		@InjectModel(PaymentMethod.name)
		private readonly paymentModel: Model<PaymentMethod>,
		@Inject(forwardRef(() => PurchaseService))
		private readonly purchaseService: PurchaseService
	) {}

	async find(owner: FindPaymentMethodDto): Promise<PaymentMethod[]> {
		try {
			return await this.paymentModel
				.find({owner})
				.populate('owner', ['email'], User.name)
		} catch (error) {
			throw new HttpException(
				error.response ?? error,
				error.status ?? HttpStatus.BAD_REQUEST
			)
		}
	}

	async create({
		name,
		balance,
		owner
	}: CreatePaymentMethodDto): Promise<PaymentMethod> {
		try {
			const method = await this.paymentModel.findOne({name, owner})
			if (method)
				throw new HttpException(
					'Способ платежа с таким названием уже существует',
					HttpStatus.CONFLICT
				)
			return await this.paymentModel.create({
				name,
				balance,
				owner,
				createdAt: dayjs().unix()
			})
		} catch (error) {
			throw new HttpException(
				error.response ?? error,
				error.status ?? HttpStatus.BAD_REQUEST
			)
		}
	}

	async update({
		_id,
		name,
		balance
	}: UpdatePaymentMethodDto): Promise<PaymentMethod> {
		try {
			const method = await this.paymentModel.findById(_id)
			if (!method) throw new NotFoundException('Способ платежа не найден')
			return await this.paymentModel
				.findByIdAndUpdate(
					_id,
					{name, balance, updatedAt: dayjs().unix()},
					{new: true}
				)
				.populate('owner', ['email'], User.name)
		} catch (error) {
			throw new HttpException(
				error.response ?? error,
				error.status ?? HttpStatus.BAD_REQUEST
			)
		}
	}

	async delete({
		_id,
		owner
	}: DeletePaymentMethodDto): Promise<PaymentMethod> {
		try {
			const method = await this.paymentModel.findById(_id)
			if (!method) throw new NotFoundException('Способ платежа не найден')
			await this.purchaseService.deleteByPayment(owner, _id)
			return await this.paymentModel
				.findByIdAndDelete(_id)
				.populate('owner', ['email'], User.name)
		} catch (error) {
			throw new HttpException(
				error.response ?? error,
				error.status ?? HttpStatus.BAD_REQUEST
			)
		}
	}

	async decrement({_id, sum}: PartialPaymentMethod & {sum: number}) {
		try {
			return await this.paymentModel.findByIdAndUpdate(_id, {
				$inc: {balance: -sum},
				updatedAt: dayjs().unix()
			})
		} catch (error) {
			throw new HttpException(
				error.response ?? error,
				error.status ?? HttpStatus.BAD_REQUEST
			)
		}
	}

	async increment({_id, sum}: PartialPaymentMethod & {sum: number}) {
		try {
			return await this.paymentModel.findByIdAndUpdate(_id, {
				$inc: {balance: sum},
				updatedAt: dayjs().unix()
			})
		} catch (error) {
			throw new HttpException(
				error.response ?? error,
				error.status ?? HttpStatus.BAD_REQUEST
			)
		}
	}
}
