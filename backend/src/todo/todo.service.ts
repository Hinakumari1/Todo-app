import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(todo: Todo): Promise<Todo> {
    const created = new this.todoModel(todo);
    const saved = await created.save();
    return saved.toObject() as Todo;  // ✅ Convert document to plain Todo
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().lean().exec();  // ✅ Lean returns plain array
  }

  async update(id: string, todo: Todo): Promise<Todo> {
    const updated = await this.todoModel.findByIdAndUpdate(id, todo, { new: true }).lean().exec();
    return updated as Todo;
  }

  async delete(id: string): Promise<Todo> {
    const deleted = await this.todoModel.findByIdAndDelete(id).lean().exec();
    return deleted as Todo;
  }
}
