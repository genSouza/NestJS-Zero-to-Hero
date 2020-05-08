import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-tasks-dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  getTasks(filtetDto: GetTaskFilterDto) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne({ uuid: id });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.createTask(createTaskDto);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const found = await this.getTaskById(id);
    const result = await this.taskRepository.delete(found.id);
    console.log(result);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
