import {
	HttpException,
	HttpStatus,
	Inject,
	Injectable,
	forwardRef
} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import {Dayjs} from 'dayjs'
import {Model} from 'mongoose'

import {AuthService} from '../auth/auth.service'
import {CreateUserDto} from './user.dto'
import {User} from './user.schema'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
		@Inject(forwardRef(() => AuthService)) private authService: AuthService
	) {}

	async create({
		email,
		password
	}: CreateUserDto): Promise<{access_token: string}> {
		try {
			const user = await this.userModel.findOne({email})
			if (user)
				throw new HttpException(
					'Пользователь с таким Email уже существует',
					HttpStatus.CONFLICT
				)
			const hashedPassword = await bcrypt.hash(password, 10)
			await this.userModel.create({
				email,
				password: hashedPassword,
				createdAt: new Dayjs().unix()
			})
			return await this.authService.signIn({email, password})
		} catch (error) {
			throw new HttpException(
				error.response ?? error,
				error.status ?? HttpStatus.BAD_REQUEST
			)
		}
	}

	async findByEmail(email: string): Promise<User | undefined> {
		try {
			const user = await this.userModel.findOne({email})
			if (!user)
				throw new HttpException(
					'Пользователь не найден',
					HttpStatus.NOT_FOUND
				)
			return user
		} catch (error) {
			throw new HttpException(
				error.response ?? error,
				error.status ?? HttpStatus.BAD_REQUEST
			)
		}
	}
}
