import {Body, Controller, Get, Post, Req} from '@nestjs/common'

import {Public} from '../../utils/app.constants'
import {LoginDto} from './auth.dto'
import {AuthService} from './auth.service'

@Controller('/auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Post('/signIn')
	async signIn(@Body() dto: LoginDto) {
		return await this.authService.signIn(dto)
	}

	@Get('/profile')
	getProfile(@Req() req: any) {
		return req.user
	}
}
