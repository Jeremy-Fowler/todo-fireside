import { todosService } from '../services/TodosService'
import BaseController from '../utils/BaseController'

export class TodosController extends BaseController {
  constructor() {
    super('api/:user/todos')
    this.router
      .get('', this.getTodos)
      .get('/:id', this.getTodoById)
      .post('', this.createTodo)
      .delete('/:id', this.removeTodo)
      .put('/:id', this.editTodo)
  }

  async editTodo(req, res, next) {
    try {
      req.body.id = req.params.id
      const todo = await todosService.editTodo(req.body)
      res.send(todo)
    } catch (error) {
      next(error)
    }
  }

  async removeTodo(req, res, next) {
    try {
      await todosService.removeTodo(req.params.id)
      res.send('delorted')
    } catch (error) {
      next(error)
    }
  }

  async createTodo(req, res, next) {
    try {
      req.body.user = req.params.user
      const todo = await todosService.createTodo(req.body)
      res.send(todo)
    } catch (error) {
      next(error)
    }
  }

  async getTodoById(req, res, next) {
    try {
      const todo = await todosService.getTodoById(req.params.id)
      res.send(todo)
    } catch (error) {
      next(error)
    }
  }

  async getTodos(req, res, next) {
    try {
      const todos = await todosService.getTodos(req.query)
      res.send(todos)
    } catch (error) {
      next(error)
    }
  }
}
