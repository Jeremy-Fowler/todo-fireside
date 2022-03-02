import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TodosService {
  async editTodo(body) {
    const todo = await this.getTodoById(body.id)
    todo.description = body.description || todo.description
    todo.completed = body.completed == null ? todo.completed : body.completed
    await todo.save()
    return todo
  }

  async removeTodo(id) {
    const todo = await this.getTodoById(id)
    await todo.delete()
  }

  async createTodo(body) {
    const todo = await dbContext.Todos.create(body)
    return todo
  }

  async getTodoById(id) {
    const todo = await dbContext.Todos.findById(id)
    if (!todo) {
      throw new BadRequest('INVALID ID')
    }
    return todo
  }

  async getTodos(query = {}) {
    const todos = await dbContext.Todos.find(query)
    return todos
  }
}

export const todosService = new TodosService()
