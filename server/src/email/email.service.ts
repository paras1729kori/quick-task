import { Resend } from 'resend';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  private resend = new Resend(process.env.RESEND_API_KEY);

  async sendEmail(to: string, subject: string, html: string) {
    const sendEmailTo = 'paras1799kori@gmail.com';
    try {
      const result = await this.resend.emails.send({
        from: 'onboarding@resend.dev',
        to: sendEmailTo,
        subject,
        html,
      });

      console.log('Email sent:', result);
      return result;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
