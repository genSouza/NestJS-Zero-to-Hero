import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-tasks-dto';

@Controller('tasks')
export class TasksController {
  /**
   *
   */
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    
    return this.tasksService.getTaskById(id);
  }
  //   @Post()
  //   createTask(@Body() body) {
  //     console.log(body);
  //   }

  //   @Post()
  //   createTask(
  //     @Body('title') title: string,
  //     @Body('description') description: string,
  //   ): Task {
  //     return this.tasksService.createTasks(title, description);
  //   }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTasks(createTaskDto);
  }
}
