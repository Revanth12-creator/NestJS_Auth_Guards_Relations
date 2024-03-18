import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { ORDER_LIST_TYPES } from './types';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post('create')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAllOrdersWithCustomerRequiredColumn();
  }

  @Get('list')
  queryFiltersBasedOnInput(@Query() input: ORDER_LIST_TYPES) {
    return this.ordersService.queryFiltersBasedOnInput(input);
  }


  @Get('profile')
  findOne(@Query() id: { orderId: string }) {
    return this.ordersService.findOneOrderDetailsWithQuery(id);
  }

  @Get('profile/details')
  findOneByQuery(@Query() attribute: { orderId: string }) {
    return this.ordersService.queryFindOneOrderDetailsWithCutomerData(attribute);
  }
}
