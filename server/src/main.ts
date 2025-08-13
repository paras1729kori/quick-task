import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], // append to list your deployed app url
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const config = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Quick-Task APIs')
    .setDescription('Quick-Task APIs routes list')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const port = config.get('PORT') || 5555;
  await app.listen(port);
  console.log(`🚀 Server listening on http://localhost:${port}`);
  console.log(`📜 Swagger Docs at http://localhost:${port}/api`);
}
bootstrap();
