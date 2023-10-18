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

import {CreateCategoryDto, UpdateCategoryDto} from './category.dto'
import {CategoryService} from './category.service'

@Controller('/category')
export class CategoryController {
	constructor(private categoryService: CategoryService) {}

	@Post('/')
	@ApiOperation({summary: 'Создание категории'})
	async createCategory(@Body() dto: CreateCategoryDto, @Req() req: any) {
		return await this.categoryService.create({
			...dto,
			owner: req.user?._id
		})
	}

	@Get('/')
	@ApiOperation({summary: 'Получение всех категорий'})
	async findCategories(@Req() req: any) {
		return await this.categoryService.find(req.user?._id)
	}

	@Patch('/:_id')
	@ApiOperation({summary: 'Изменение категории'})
	async updateCategory(
		@Body() dto: UpdateCategoryDto,
		@Param('_id') _id: string
	) {
		return await this.categoryService.update({_id, ...dto})
	}

	@Delete('/:_id')
	@ApiOperation({summary: 'Удаление категории'})
	async deleteCategory(@Param('_id') _id: Types.ObjectId) {
		return await this.categoryService.delete(_id)
	}
}
