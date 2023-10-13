import {NestFactory} from '@nestjs/core'
import {SwaggerModule} from '@nestjs/swagger'

import {AppModule} from './app/app.module'
import {swaggerConfig} from './utils/swagger.config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const document = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup('api', app, document)
	app.enableCors()
	await app.listen(3000)
}
bootstrap()
