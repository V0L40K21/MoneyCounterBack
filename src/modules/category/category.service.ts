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
	CreateCategoryDto,
	DeleteCategoryDto,
	FindCategoryDto,
	UpdateCategoryDto
} from './category.dto'
import {Category} from './category.schema'
import {PurchaseService} from '../purchase/purchase.service'

@Injectable()
export class CategoryService {
	constructor(
		@InjectModel(Category.name)
		private readonly categoryModel: Model<Category>,
		@Inject(forwardRef(() => PurchaseService))
		private readonly purchaseService: PurchaseService
	) {}

	async find(owner: FindCategoryDto): Promise<Category[]> {
		try {
			return await this.categoryModel
				.find({owner})
				.populate('owner', ['email'], User.name)
		} catch (error) {
			throw new HttpException(
				error.response ?? error,
				error.status ?? HttpStatus.BAD_REQUEST
			)
		}
	}

	async create({name, owner}: CreateCategoryDto): Promise<Category> {
		try {
			const category = await this.categoryModel.findOne({name, owner})
			if (category)
				throw new HttpException(
					'Категория с таким названием уже существует',
					HttpStatus.CONFLICT
				)
			return await this.categoryModel.create({
				name,
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

	async update({_id, name}: UpdateCategoryDto): Promise<Category> {
		try {
			const category = await this.categoryModel.findById(_id)
			if (!category) throw new NotFoundException('Категория не найдена')
			return await this.categoryModel
				.findByIdAndUpdate(
					_id,
					{name, updatedAt: dayjs().unix()},
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

	async delete({_id, owner}: DeleteCategoryDto): Promise<Category> {
		try {
			const category = await this.categoryModel.findById(_id)
			if (!category) throw new NotFoundException('Категория не найдена')
			await this.purchaseService.deleteByCategory(owner, _id)
			return await this.categoryModel
				.findByIdAndDelete(_id)
				.populate('owner', ['email'], User.name)
		} catch (error) {
			throw new HttpException(
				error.response ?? error,
				error.status ?? HttpStatus.BAD_REQUEST
			)
		}
	}
}
