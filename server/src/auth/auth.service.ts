import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const matched = await bcrypt.compare(pass, user.password);
    if (matched) {
      const { password, ...rest } = user as any;
      return rest;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    // Generate short-lived reset token (e.g., valid for 15 minutes)
    const token = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { expiresIn: '15m', secret: process.env.JWT_RESET_SECRET },
    );

    // // send token via email here
    // const htmlSring = `<p>Your OTP is <strong>${token}</strong>. It will expire in 5 minutes.</p>`;
    // await this.emailService.sendEmail(
    //   user?.email,
    //   'Password Reset OTP',
    //   htmlSring,
    // );

    return { message: 'Password reset link generated', token };
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_RESET_SECRET,
      });

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await this.prisma.user.update({
        where: { id: payload.sub },
        data: { password: hashedPassword },
      });

      return { message: 'Password updated successfully' };
    } catch (err) {
      throw new BadRequestException('Invalid or expired token');
    }
  }
}
