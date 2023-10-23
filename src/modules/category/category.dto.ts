import {OmitType, PartialType, PickType} from '@nestjs/swagger'

import {Category} from './category.schema'

export class PartialCategory extends PartialType(Category) {}
export class CreateCategoryDto extends OmitType(Category, [
	'updatedAt',
	'createdAt'
] as const) {}
export class FindCategoryDto extends PickType(PartialCategory, ['_id']) {}
export class DeleteCategoryDto extends PickType(PartialCategory, [
	'owner',
	'_id'
]) {}
export class UpdateCategoryDto extends OmitType(Category, [
	'createdAt'
] as const) {}
