import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { CUSTOMER_FILETER_LIST_TYPES } from './types';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private customerService: Repository<Customer>,
  ) { }

  create(createCustomerDto: CreateCustomerDto) {
    try {
      const { name, email, mobile_number } = createCustomerDto;
      let createCustomer = {
        name,
        email,
        mobile_number
      }
      return this.customerService.save(createCustomer)
    } catch (err) {
      return err
    }
  }

  async findAll() {
    return this.customerService.find({
      relations: { orders: true }, select: {
        name: true,
        orders: {
          name: true
        }
      }
    });
  }

  findOne(userId: string) {
    return this.customerService.findOne({ where: { userId } });
  }

  async findOneCustomerByQuery(userData: { userId: string, name: string }) {
    try {
      const query = this.customerService.createQueryBuilder('customer')
        .select([
          `customer.userId as userId`,
          `customer.email as email`,
          `customer.name as name `,
          `customer.mobile_number as mobile_number`,
        ]);
      if (userData.userId) {
        let findUser = query.where(`userId LIKE :userId`, { userId: `%${userData.userId}%` });
        return await findUser.getRawOne() ? { statuCode: 200, data: await findUser.getRawOne() } : { statusCode: 200, data: [], message: 'No Data available' }
      } else {
        throw new HttpException({ message: 'Someting went wrogn' }, 400)
      }
    } catch (err) {
      return err
    }
  }

  async update(userId: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      const { email, name, mobile_number } = updateCustomerDto;
      const updateCustomer = {
        email, name, mobile_number
      }
      const isUserUpdate = await this.customerService.update(userId, updateCustomer);
      if (isUserUpdate.affected == 1) {
        return { statuCode: 200, message: 'Updated successfully' }
      }
      else {
        throw new HttpException({ message: "Somting wnent wrong" }, 400)
      }
    } catch (err) {
      return err
    }

  }

  async remove(userId: string) {
    try {
      const isUserUpdate = await this.customerService.delete(userId);
      if (isUserUpdate.affected == 1) {
        return { statuCode: 200, message: 'Deleted successfully' }
      }
      else {
        throw new HttpException({ message: "Somting wnent wrong" }, 400)
      }
    } catch (err) {
      return err
    }
  }

  async filtersBasedOnInput(input: CUSTOMER_FILETER_LIST_TYPES) {
    const { name, email, mobile_number } = input;
    let condition: FindOptionsWhere<Customer> | FindOptionsWhere<Customer>[] = {
      ...(name ? { name: name } : {}),
      ...(email ? { email: email } : {}),
      ...(mobile_number ? { mobile_number: mobile_number } : {}),
    }
    return this.customerService.find({ where: condition });
  }
}
