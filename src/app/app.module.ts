import {Module} from '@nestjs/common'
import {APP_GUARD} from '@nestjs/core'
import {MongooseModule} from '@nestjs/mongoose'

import {AuthGuard} from 'src/modules/auth/auth.guard'
import {AuthModule} from 'src/modules/auth/auth.module'
import {PaymentMethodModule} from 'src/modules/paymentMethod/payment.module'
import {UserModule} from '../modules/user/user.module'
import {AppController} from './app.controller'
import {AppService} from './app.service'

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost:27017/moneyCounter'),
		UserModule,
		AuthModule,
		PaymentMethodModule
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
