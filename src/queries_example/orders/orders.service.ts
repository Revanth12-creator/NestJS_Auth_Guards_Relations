import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private custometService: Repository<Order>) { }
  async create(createOrderDto: CreateOrderDto) {
    const { name, price, address } = createOrderDto;
    const createOrder = {
      name, price, address,
    }
    return this.custometService.save(createOrder)
  }

  async findAll() {
    const myQuery = 'SELECT * FROM orders';
    return await this.custometService.query(myQuery)
  }

  async findOne(orderId: string) {
    const myQuery = `SELECT * FROM orders WHERE orderId = '${orderId
      }'`
    return await this.custometService.query(myQuery)
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
