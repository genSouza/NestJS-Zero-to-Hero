import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-tasks-dto';
import { TaskStatus } from './task-status.enum';
import { v4 as uuidv4 } from 'uuid';
import { GetTaskFilterDto } from './dto/get-tasks-filter-dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]>{
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');
        
        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
        }

        const tasks = await query.getMany();
        return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.uuid = uuidv4();
    
    await task.save();
    return task;
  }
}
