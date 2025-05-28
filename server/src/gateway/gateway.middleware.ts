import { Injectable, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from './middleware/auth.middleware';
import { Request, Response, NextFunction } from 'express';

// Middleware ghi nhật ký
export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const { method, originalUrl, ip } = req;
  console.log(`[${new Date().toISOString()}] ${method} ${originalUrl} - ${ip}`);
  
  // Ghi lại thời gian phản hồi
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${method} ${originalUrl} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
}

// Middleware xử lý lỗi
export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(`[ERROR] ${err.message}`);
  console.error(err.stack);
  
  if (!res.headersSent) {
    res.status(500).json({
      message: 'Đã xảy ra lỗi trong quá trình xử lý yêu cầu',
      error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
    });
  }
  
  next(err);
}

// Cập nhật GatewayModule để áp dụng middleware
@Injectable()
export class GatewayMiddleware implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Áp dụng middleware ghi nhật ký cho tất cả các route
    consumer
      .apply(loggerMiddleware)
      .forRoutes('*');
      
    // Áp dụng middleware xác thực cho các route cần bảo vệ
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'api/identity/auth/login', method: RequestMethod.POST },
        { path: 'api/identity/auth/register', method: RequestMethod.POST },
        { path: 'api/health', method: RequestMethod.GET }
      )
      .forRoutes('api/identity', 'api/product', 'api/order');
  }
}