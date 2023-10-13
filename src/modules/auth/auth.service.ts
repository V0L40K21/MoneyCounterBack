import {Inject, Injectable, UnauthorizedException, forwardRef} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import {Types} from 'mongoose'

import {UserService} from '../user/user.service'
import {LoginDto} from './auth.dto'

@Injectable()
export class AuthService {
	constructor(
		@Inject(forwardRef(() => UserService)) private userService: UserService,
		private readonly jwtService: JwtService
	) {}

	async signIn({email, password}: LoginDto): Promise<{access_token: string}> {
		const user = await this.userService.findByEmail(email)
		const correctPass = await bcrypt.compare(password, user?.password)
		if (!correctPass) {
			throw new UnauthorizedException('Неверный Email или пароль')
		}
		const payload = {_id: new Types.ObjectId(user?._id), email: user?.email}
		return {
			access_token: await this.jwtService.signAsync(payload)
		}
	}
}
