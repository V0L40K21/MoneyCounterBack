import {NestFactory} from '@nestjs/core'
import {SwaggerModule} from '@nestjs/swagger'
// const cors = require('cors')

import {AppModule} from './app/app.module'
import {swaggerConfig} from './utils/swagger.config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const document = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup('api', app, document)
	// app.use(cors())
	app.enableCors()
	await app.listen(process.env.PORT || 3000)
}
bootstrap()
