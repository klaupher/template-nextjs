import { Expense } from "../core/entities/ExpenseModel";
import { BadRequestError } from "../core/helpers/api-errors";
import { ExpenseRepository } from "../infrastructure/repositories/ExpenseRepository";

export class ExpenseService {
  static async create(obj: Expense) {
    const expenseExist = await ExpenseRepository.findOneBy({
      fullname: obj.fullname,
    });
    if (expenseExist) {
      throw new BadRequestError("Categoria já existente.");
    }

    const newExpense = ExpenseRepository.create({
      ...obj,
      createdAt: new Date(),
    });
    await ExpenseRepository.save(newExpense);
    return newExpense;
  }

  static async update(id: number, obj: Expense) {
    const expenseExist = await ExpenseRepository.findOneBy({ id });
    if (!expenseExist) {
      throw new BadRequestError("Categoria não encontrada.");
    }

    const upExpense = ExpenseRepository.merge(expenseExist, obj);
    return await ExpenseRepository.save(upExpense);
  }

  static async delete(id: number) {
    return await ExpenseRepository.delete(id);
  }
  static async list() {
    return await ExpenseRepository.find();
  }

  static async getById(id: number) {
    return await ExpenseRepository.findOneBy({ id });
  }
}
