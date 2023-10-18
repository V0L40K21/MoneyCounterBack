import {
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException
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

@Injectable()
export class CategoryService {
	constructor(
		@InjectModel(Category.name)
		private readonly categoryModel: Model<Category>
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
			const category = await this.categoryModel.findOne({name})
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

	async delete(_id: DeleteCategoryDto): Promise<Category> {
		try {
			const category = await this.categoryModel.findById(_id)
			if (!category) throw new NotFoundException('Категория не найдена')
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
