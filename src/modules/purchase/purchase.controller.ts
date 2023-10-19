import {Body, Controller, Get, Post, Query, Req} from '@nestjs/common'
import {ApiOperation} from '@nestjs/swagger'

import {CreatePurchaseDto} from './purchase.dto'
import {PurchaseService} from './purchase.service'

@Controller('/purchase')
export class PurchaseController {
	constructor(private purchaseService: PurchaseService) {}

	@Post('/decrement')
	@ApiOperation({summary: 'Создание платежной операции (Покупка)'})
	async createDecrement(@Body() dto: CreatePurchaseDto, @Req() req: any) {
		return await this.purchaseService.decrement({
			...dto,
			owner: req.user?._id
		})
	}

	@Post('/increment')
	@ApiOperation({summary: 'Создание платежной операции (Зачисление)'})
	async createIncrement(@Body() dto: CreatePurchaseDto, @Req() req: any) {
		return await this.purchaseService.increment({
			...dto,
			owner: req.user?._id
		})
	}

	@Get('/')
	@ApiOperation({summary: 'Получение списка платежных операций'})
	async find(@Req() req: any, @Query('dateRange') dateRange: string[]) {
		return await this.purchaseService.find(req.user?._id, dateRange)
	}
}
