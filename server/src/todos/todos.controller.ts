import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../common/decorators/user.decorator';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@CurrentUser() user: any, @Body() dto: CreateTodoDto) {
    return this.todosService.create(user.userId, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@CurrentUser() user: any, @Query() query: any) {
    return this.todosService.findAll(user.userId, query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@CurrentUser() user: any, @Param('id') id: string) {
    return this.todosService.findOne(user.userId, Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() dto: UpdateTodoDto,
  ) {
    return this.todosService.update(user.userId, Number(id), dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async softDelete(@CurrentUser() user: any, @Param('id') id: string) {
    return this.todosService.softDelete(user.userId, Number(id));
  }
}
