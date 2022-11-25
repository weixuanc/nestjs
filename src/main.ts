import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { AuthGuard } from './common/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 接口版本化管理
  app.enableVersioning({
    // defaultVersion: '1', // 默认版本号,全局配置，优先级最低
    defaultVersion: [VERSION_NEUTRAL, '1', '2'], // 配置多版本
    type: VersioningType.URI
  })
  // 配置全局守卫
  app.useGlobalGuards(new AuthGuard())
  // 配置全局正常返回参数
  app.useGlobalInterceptors(new TransformInterceptor());
  // 异常过滤器: 从右往左执行过滤器，捕获之后不再往左执行
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
