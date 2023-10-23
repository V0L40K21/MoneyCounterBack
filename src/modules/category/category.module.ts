import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'

import {CategoryController} from './category.controller'
import {Category, CategorySchema} from './category.schema'
import {CategoryService} from './category.service'
import {PurchaseModule} from '../purchase/purchase.module'

@Module({
	imports: [
		MongooseModule.forFeature([
			{name: Category.name, schema: CategorySchema}
		]),
		PurchaseModule
	],
	controllers: [CategoryController],
	providers: [CategoryService],
	exports: [CategoryService]
})
export class CategoryModule {}
