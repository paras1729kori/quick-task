import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateTodoDto) {
    return this.prisma.todo.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status || 'pending',
        priority: dto.priority || 'medium',
        dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
        userId,
      },
    });
  }

  async findAll(userId: number, filters: any) {
    const where: any = { userId, isDeleted: false };
    if (filters.status) where.status = filters.status;
    if (filters.priority) where.priority = filters.priority;
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }
    return this.prisma.todo.findMany({ where, orderBy: { createdAt: 'desc' } });
  }

  async findOne(userId: number, id: number) {
    const todo = await this.prisma.todo.findFirst({
      where: { id, userId, isDeleted: false },
    });
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  async update(userId: number, id: number, dto: UpdateTodoDto) {
    await this.findOne(userId, id);
    return this.prisma.todo.update({
      where: { id },
      data: {
        ...dto,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      },
    });
  }

  async softDelete(userId: number, id: number) {
    await this.findOne(userId, id);
    return this.prisma.todo.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
