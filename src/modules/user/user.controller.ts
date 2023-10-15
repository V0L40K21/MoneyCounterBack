import {Body, Controller, Post} from '@nestjs/common'
import {ApiOperation} from '@nestjs/swagger'

import {Public} from '../../utils/app.constants'
import {CreateUserDto} from './user.dto'
import {UserService} from './user.service'

@Controller('/user')
export class UserController {
	constructor(private userService: UserService) {}

	@Public()
	@Post('/')
	@ApiOperation({summary: 'Создание пользователя'})
	async createUser(@Body() dto: CreateUserDto) {
		return await this.userService.create(dto)
	}
}
