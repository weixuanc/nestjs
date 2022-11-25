import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
  use(req: Request, res: Response, next: NextFunction) {
    // console.log('进入中间件');
    next();
    // console.log('回到中间件');
  }
}