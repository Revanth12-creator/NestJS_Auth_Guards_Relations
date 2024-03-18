import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { ORDER_LIST_TYPES } from './types';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private orderService: Repository<Order>) { }
  //create order
  async create(createOrderDto: CreateOrderDto) {
    const { name, price, address, customer_id } = createOrderDto;
    const createOrder = {
      name, price, address, customer_id
    }
    let create = this.orderService.create(createOrder)
    return this.orderService.save(create)
  }

  //find only  all  order details
  async findAllOrders() {
    return await this.orderService.find();
  }

  //find all order data with (CUSTOMER DATA)
  async findAllOrdersWithCustomer() {
    return await this.orderService.find({
      relations: {
        customer: true
      }
    })
  }

  //find all order details with customer data  (REQUIRED FIELDS ONLY)
  async findAllOrdersWithCustomerRequiredColumn() {
    return await this.orderService.find({
      relations: {
        customer: true
      },
      select: {
        orderId: true,
        name: true,
        price: true,
        customer: {
          name: true,
          mobile_number: true
        }
      }
    })
  }

  //fiter  API order details with customer data (USING QUERY) ***
  async queryFiltersBasedOnInput(input: ORDER_LIST_TYPES) {
    try {
      let { name, price, address, customer_id } = input;
      let query_builder = this.orderService.createQueryBuilder('orders');
      name && query_builder.andWhere('orders.name = :name', { name });
      price && query_builder.andWhere('orders.price = :price', { price });
      address && query_builder.andWhere('orders.address = :address', { address });
      customer_id && query_builder.andWhere('orders.customer_id = :customer_id', { customer_id });
      return await query_builder.select(['orders']).getMany(); //This is for only reuired columns "select(['orders.name'])""
    } catch (error) {
      return error
    }
  }

  //fiter orrder details with customer data (USING QUERY) ***
  async queryFiltersBasedOnInputWithJoins(input: ORDER_LIST_TYPES) {
    try {
      let { name, price, address, customer_id } = input;
      let query_builder = this.orderService.createQueryBuilder('orders');
      name && query_builder.andWhere('orders.name = :name', { name });
      price && query_builder.andWhere('orders.price = :price', { price });
      address && query_builder.andWhere('orders.address = :address', { address });
      customer_id && query_builder.andWhere('orders.customer_id = :customer_id', { customer_id });
      return await query_builder.leftJoin('orders.customer', 'customer').select(['orders.name', 'customer.name']) //This is for only required columns or ['orders', 'customer'] => all columns
        .getMany();
    } catch (error) {
      return error
    }
  }


  //find  only one OrderDetails 
  async findOneOrderDetails(orderId: string) {
    return await this.orderService.findOne({
      where: { orderId },
    });
  }

  //find  only one OrderDetails with cutomer data (REQUIRED COLUMNS)
  async findOneOrderDetailsWithCutomerData(orderId: string) {
    return await this.orderService.findOne({
      where: { orderId },
      relations: { customer: true },
      select: {
        orderId: true,
        name: true,
        price: true,
        customer: {
          name: true,
          mobile_number: true
        }
      }
    });
  }

  //find  only one  OrderDetails (USING QUERY)
  async findOneOrderDetailsWithQuery(id: { orderId: string }) {
    const myQuery = `SELECT * FROM orders WHERE orderId = '${id.orderId}'`;
    return await this.orderService.query(myQuery);
  }

  //find  only one OrderDetails with cutomer data (USING QUERY))
  async queryFindOneOrderDetailsWithCutomerData(attribute: { orderId: string }) {
    try {
      let query_builder = this.orderService.createQueryBuilder('orders');
      let result = await query_builder.where('orders.orderId = :orderId', {
        orderId: attribute.orderId
      }).getRawOne();
      console.log(result);
      return result
    } catch (error) {
      return error
    }
  }

}
