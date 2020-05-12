import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-tasks-dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Users } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDto: GetTaskFilterDto, user: Users): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(uuid: string, user: Users): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: { uuid, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Task with ID "${uuid}" not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: Users): Promise<Task> {
    const task = this.taskRepository.createTask(createTaskDto, user);
    return task;
  }

  async deleteTask(id: string, user: Users): Promise<void> {
    const found = await this.getTaskById(id, user);
    const result = await this.taskRepository.delete(found.id);
    console.log(result);
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: Users,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }
}
