import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 接口版本化管理
  app.enableVersioning({
    // defaultVersion: '1', // 默认版本号,全局配置，优先级最低
    defaultVersion: [VERSION_NEUTRAL, '1', '2'], // 配置多版本
    type: VersioningType.URI
  })
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
