import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }
  async create(createUserDto: CreateUserDto) {
    try {
      let { first_name, last_name, age, address, id } = createUserDto;
      let createUser = {
        id: id,
        first_name: first_name,
        last_name: last_name,
        age: age,
        address: address,
      };
      let userCreated = await this.userRepository.save(createUser);
      if (!userCreated) {
        return { statusCode: 400, message: 'Something went wrong' };
      }
      return { statusCode: 200, data: {}, message: 'Create Successfully' };
    } catch (err) {
      return { statusCode: 500, data: {}, message: err };

    }
  }

  async findAll() {
    let usersData = await this.userRepository.find();
    if (usersData.length === 0) {
      return { statusCode: 200, data: [], message: 'NO DATA AVILABLE' };
    }
    return { statusCode: 200, data: usersData };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return {
        statusCode: 404,
        message: 'No user found for this id',
      };
    }
    return { statusCode: 200, data: user };;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let { first_name, last_name, age, address } = updateUserDto;
    let updateUser = {
      first_name: first_name,
      last_name: last_name,
      age: age,
      address: address,
    };
    let isUserUpdated = await this.userRepository.update({ id }, updateUser);
    if (isUserUpdated.affected == 0) {
      return { statusCode: 404, message: 'Somting went wrong' };
    } else {
      return { statusCode: 200, message: 'Updated Sucessfully' };
    }
  }

  async remove(id: number) {
    let isUserDeleted = this.userRepository.delete(id);
    if ((await isUserDeleted).affected == 0) {
      return { statusCode: 404, message: 'Somting went wrong' };
    } else {
      return { statusCode: 200, message: 'Deleted Successfully' };
    }
  }
  async filtersListingAPI(filterObje: {
    search_string?: string;
    address?: string;
    page?: number;
    size?: number;
  }) {
    let searchInfo = await this.userRepository.find();
    //search
    if (filterObje.search_string) {
      let filterData = searchInfo.filter((obj) =>
        obj.first_name
          .toLocaleLowerCase()
          .includes(filterObje.search_string.toLocaleLowerCase()),
      );
      if (filterData.length == 0) {
        return { statusCode: 200, data: [], message: 'No Data Available' };
      }
      return filterData;
    }
    // filterBy address
    if (filterObje.address) {
      let filterData = searchInfo.filter(
        (obj) => obj.address == filterObje.address,
      );
      if (filterData.length == 0) {
        return { statusCode: 200, data: [], message: 'No Data Available' };
      }
      return filterData;
    }
    //pagination
    if (filterObje.page && filterObje.size) {
      let endingRecord = filterObje.page * filterObje.size;
      let statingRecord = endingRecord - filterObje.size;
      let currentPageData = searchInfo.slice(statingRecord, endingRecord);
      if (currentPageData.length == 0) {
        return { statusCode: 200, data: [], message: 'No Data Available' };
      }
      return currentPageData;
    }
  }
  async searchByQuery(filterObj: { search_string: string }) {
    let usersData = this.userRepository.createQueryBuilder('user_details')
      .select([
        'user_details.id AS id',
        'user_details.first_name AS first_name',
        'user_details.last_name AS id',
        'user_details.age AS age',
        'user_details.address AS address',
      ]);
    if (filterObj.search_string) {
      usersData.where(`first_name LIKE :search_string`, {
        search_string:
          `%${filterObj.search_string}%`
      });

      return await usersData.getRawOne() ? { statuCode: 200, data: await usersData.getRawMany() } : { statusCode: 200, data: [], message: 'No Data available' };
    }
  }
}
