import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'

import {PaymentMethodController} from './payment.controller'
import {PaymentMethod, PaymentMethodSchema} from './payment.schema'
import {PaymentMethodService} from './payment.service'

@Module({
	imports: [
		MongooseModule.forFeature([{name: PaymentMethod.name, schema: PaymentMethodSchema}])
	],
	controllers: [PaymentMethodController],
	providers: [PaymentMethodService],
	exports: [PaymentMethodService]
})
export class PaymentMethodModule {}
