import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('employee')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('profile/:id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.userService.remove(+id);
  }

  @Get('search')
  filtersListingAPI(
    @Query()
    filterObje: {
      search_string?: string;
      address?: string;
      page?: number;
      size?: number;
    },
  ) {
    return this.userService.filtersListingAPI(filterObje);
  }
  @Get('search-by-query')
  querySearch(@Query() filterObj: { search_string: string }) {
    return this.userService.searchByQuery(filterObj);
  }
}
