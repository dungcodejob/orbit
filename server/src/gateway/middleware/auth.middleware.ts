import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Kiểm tra token xác thực từ header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      // Cho phép các route công khai đi qua mà không cần xác thực
      // Ví dụ: đăng nhập, đăng ký, v.v.
      if (req.path.includes('/api/identity/auth/login') || 
          req.path.includes('/api/identity/auth/register') ||
          req.path.includes('/api/health')) {
        return next();
      }
      
      return res.status(401).json({ message: 'Không có token xác thực' });
    }
    
    // Thêm logic xác thực token ở đây
    // Trong môi trường thực tế, bạn sẽ xác thực JWT token
    
    // Nếu token hợp lệ, cho phép request đi tiếp
    next();
  }
}