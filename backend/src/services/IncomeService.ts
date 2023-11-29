import { Income } from "../core/entities/IncomeModel";
import { BadRequestError } from "../core/helpers/api-errors";
import { IncomeRepository } from "../infrastructure/repositories/IncomeRepository";

export class IncomeService {
  static async create(obj: Income) {
    const incomeExist = await IncomeRepository.findOneBy({
      fullname: obj.fullname,
    });
    if (incomeExist) {
      throw new BadRequestError("Categoria já existente.");
    }

    const newIncome = IncomeRepository.create({
      ...obj,
      createdAt: new Date(),
    });
    await IncomeRepository.save(newIncome);
    return newIncome;
  }

  static async update(id: number, obj: Income) {
    const incomeExist = await IncomeRepository.findOneBy({ id });
    if (!incomeExist) {
      throw new BadRequestError("Categoria não encontrada.");
    }

    const upIncome = IncomeRepository.merge(incomeExist, obj);
    return await IncomeRepository.save(upIncome);
  }

  static async delete(id: number) {
    return await IncomeRepository.delete(id);
  }
  static async list() {
    return await IncomeRepository.find();
  }

  static async getById(id: number) {
    return await IncomeRepository.findOneBy({ id });
  }
}
