import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
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
		ConfigModule.forRoot({isGlobal: true}),
		MongooseModule.forRoot(process.env.MONGO_URL),
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
