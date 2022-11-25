import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { LoggerMiddleware } from './common/middleware/logger.middleware';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './utils';

@Module({
  imports: [
    // 默认会从项目根目录载入并解析一个.env文件和process.env合并存储到一个通过ConfigService访问的私有结构
    // forRoot()方法注册了ConfigService提供者，运行环境变量优先级高于.env配置文件变量
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      // isGlobal没有添加，需要先注册ConfigService服务才能正常使用
      isGlobal: true,
      // 传入一个返回json的函数
      load: [getConfig]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
