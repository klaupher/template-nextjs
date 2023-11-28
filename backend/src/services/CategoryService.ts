import { Category } from "../core/entities/CategoryModel";
import { BadRequestError } from "../core/helpers/api-errors";
import { CategoryRepository } from "../infrastructure/repositories/CategoryRepository";

export class CategoryService {
    static async create(obj: Category) {
        const categoryExist = await CategoryRepository.findOneBy({ alias: obj.alias });
        if (categoryExist) {
          throw new BadRequestError('Categoria já existente.');
        }

        const newCategory = CategoryRepository.create({
            ...obj,
            createdAt: new Date()
        })
        await CategoryRepository.save(newCategory);
        return newCategory;
      }
} ;