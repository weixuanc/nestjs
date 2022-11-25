import { Controller, Get, Version } from '@nestjs/common';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller({
  path: 'user',
  // version: '1'
})
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get('test')
  getHello(): string {
    console.log('执行test方法')
    // let obj:any = {}
    // try {
    //   console.log(obj.a.b);
    // } catch (error) {
    //   throw new BusinessException('你这个参数错了')
    // }
    console.log(this.configService.get('env'))
    console.log(this.configService.get('info').name)
    return this.appService.getHello();
  }

  @Get('test')
  @Version('2') // 方法的version会覆盖控制器的version
  getHello1(): string {
    return 'test2';
  }
}
