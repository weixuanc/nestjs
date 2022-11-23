import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({
  path: 'user',
  // version: '1'
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  @Version('2') // 方法的version会覆盖控制器的version
  getHello1(): string {
    return 'test2';
  }
}
