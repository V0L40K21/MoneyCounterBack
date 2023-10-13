import {DocumentBuilder} from '@nestjs/swagger'

export const swaggerConfig = new DocumentBuilder()
	.setTitle('Money Counter')
	.setDescription('The Money Counter API description')
	.setVersion('1.0')
	.build()
