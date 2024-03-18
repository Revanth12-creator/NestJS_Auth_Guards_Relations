import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CUSTOMER_FILETER_LIST_TYPES } from './types';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Post('create')
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get('profile/:id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Get('profile')
  findCustomerByQuery(@Query() userData: { userId: string, name: string }) {
    return this.customerService.findOneCustomerByQuery(userData)
  }



  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }

  @Get('list')
  coustomerFiltersList(@Query() input: CUSTOMER_FILETER_LIST_TYPES) {
    return this.customerService.filtersBasedOnInput(input)
  }
}
