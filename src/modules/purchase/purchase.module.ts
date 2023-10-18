import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'

import {CategoryModule} from '../category/category.module'
import {PaymentMethodModule} from '../paymentMethod/payment.module'
import {PurchaseController} from './purchase.controller'
import {Purchase, PurchaseSchema} from './purchase.schema'
import {PurchaseService} from './purchase.service'

@Module({
	imports: [
		MongooseModule.forFeature([
			{name: Purchase.name, schema: PurchaseSchema}
		]),
		PaymentMethodModule,
		CategoryModule
	],
	controllers: [PurchaseController],
	providers: [PurchaseService],
	exports: [PurchaseService]
})
export class PurchaseModule {}
