import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
import {APP_GUARD} from '@nestjs/core'
import {MongooseModule} from '@nestjs/mongoose'

import {AuthGuard} from '../modules/auth/auth.guard'
import {AuthModule} from '../modules/auth/auth.module'
import {CategoryModule} from '../modules/category/category.module'
import {PaymentMethodModule} from '../modules/paymentMethod/payment.module'
import {UserModule} from '../modules/user/user.module'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {PurchaseModule} from 'src/modules/purchase/purchase.module'

@Module({
	imports: [
		ConfigModule.forRoot({isGlobal: true}),
		MongooseModule.forRoot(process.env.MONGO_URL),
		UserModule,
		AuthModule,
		PaymentMethodModule,
		CategoryModule,
		PurchaseModule
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard
		},
		AppService
	]
})
export class AppModule {}
