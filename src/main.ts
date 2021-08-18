import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception/allException.filter';
import { ExceptionService } from './exception/exception.service';

/**
 * @description 전역적 오류를 처리해주는 설정 초기화 함수
 *
 * @param app
 * @type INestApplication
 */
function useGlobalErrorHandler(app: INestApplication) {
  const exceptionService = app.get(ExceptionService);

  app.useGlobalFilters(new AllExceptionsFilter(exceptionService));
}

/**
 * @description API 문서 설정 초기화 함수
 *
 * @param app
 * @type INestApplication
 */
function useSwaggerDocument(app: INestApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API 입니다')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'accessToken',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/', app, document);
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:3000'],
    },
  });
  app.useGlobalPipes(new ValidationPipe());

  useGlobalErrorHandler(app);

  useSwaggerDocument(app);

  app.listen(80);
}
bootstrap();
