import {Module, forwardRef} from '@nestjs/common'
import {JwtModule} from '@nestjs/jwt'

import {jwtConstants} from 'src/utils/app.constants'
import {UserModule} from '../user/user.module'
import {AuthController} from './auth.controller'
import {AuthService} from './auth.service'

@Module({
	imports: [
		JwtModule.register({
			global: true,
			secret: jwtConstants.secret,
			signOptions: {expiresIn: '12h'}
		}),
		forwardRef(() => UserModule)
	],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [AuthService]
})
export class AuthModule {}
