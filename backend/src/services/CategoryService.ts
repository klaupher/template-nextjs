import { Category } from "../core/entities/CategoryModel";
import { BadRequestError } from "../core/helpers/api-errors";
import { CategoryRepository } from "../infrastructure/repositories/CategoryRepository";

export class CategoryService {
  static async create(obj: Category) {
    const categoryExist = await CategoryRepository.findOneBy({
      alias: obj.alias,
    });
    if (categoryExist) {
      throw new BadRequestError("Categoria já existente.");
    }

    const newCategory = CategoryRepository.create({
      ...obj,
      createdAt: new Date(),
    });
    await CategoryRepository.save(newCategory);
    return newCategory;
  }

  static async update(id: number, obj: Category) {
    const categoryExist = await CategoryRepository.findOneBy({ id });
    if (!categoryExist) {
      throw new BadRequestError("Categoria não encontrada.");
    }

    const upCategory = CategoryRepository.merge(categoryExist, obj);
    return await CategoryRepository.save(upCategory);
  }

  static async delete(id: number) {
    return await CategoryRepository.delete(id);
  }

  static async list() {
    return await CategoryRepository.find();
  }

  static async getById(id: number) {
    return await CategoryRepository.findOneBy({ id });
  }
}
