import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuationsService } from '../quations/quations.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryService: Repository<Category>,
    private quationService: QuationsService
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const { description, name, quationId } = createCategoryDto;
      const creatCategory = {
        name, description
      };
      let matchedQuations = await this.quationService.findAll()
      const categoryObj = this.categoryService.create(creatCategory);
      if (matchedQuations.length > 0) {
        let data = matchedQuations.filter((val) => quationId.includes(val.id));
        categoryObj.quations = data ? data : []
      }
      return await this.categoryService.save(categoryObj)
    } catch (err) {
      return err
    }
  }

  async findAll() {
    return await this.categoryService.find({
      relations: {
        quations: true
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const { name, description, quationId } = updateCategoryDto;
    let matchedQuations = await this.quationService.findAll();
    const updateObj = {
      name, description
    }
    const categoryObj = this.categoryService.create(updateObj);

    if (matchedQuations.length > 0) {
      let data = matchedQuations.filter((val) => quationId.includes(val.id));
      categoryObj.quations = data ? data : [];
    }
    let updateCities = await this.categoryService.update(id, categoryObj);;

    if (updateCities.affected == 1) {
      return { statusCode: 200, message: 'Updated Succesfully' }
    } else {
      return { statusCode: 400, message: 'Something went wrong' }
    }
  }

  remove(id: number) {
    return this.categoryService.delete(id)
  }
}
