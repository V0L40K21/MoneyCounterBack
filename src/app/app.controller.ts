import {Controller, Get} from '@nestjs/common'

import {AppService} from './app.service'
import {Public} from 'src/utils/app.constants'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Public()
	@Get()
	getHello(): string {
		return this.appService.getHello()
	}
}
