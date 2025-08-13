import {
  Controller,
  Post,
  Body,
  Get,
  NotFoundException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const user = await this.usersService.create(dto);
    // hide password
    const { password, ...rest } = user as any;
    return rest;
  }

  @Get('detail')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async detail(@Query('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
