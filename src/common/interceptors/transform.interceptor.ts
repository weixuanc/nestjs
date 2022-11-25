import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    // console.log('执行拦截器')
    return next.handle().pipe(
      map((data) => {
        // console.log('执行拦截器end')
        return {
          data,
          status: 0,
          extra: {},
          message: 'success',
          success: true,
        }
      }),
    );
  }
}