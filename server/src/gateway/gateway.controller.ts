import { Controller, All, Req, Res, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Controller('api')
export class GatewayController {
  constructor(
    @Inject('IDENTITY_SERVICE') private readonly identityService: ClientProxy,
    @Inject('PRODUCT_SERVICE') private readonly productService: ClientProxy,
    @Inject('ORDER_SERVICE') private readonly orderService: ClientProxy,
  ) {}

  @All('identity/*')
  handleIdentityRequests(@Req() req: Request, @Res() res: Response): Observable<any> {
    const path = req.url.replace('/api/identity', '');
    const pattern = { cmd: 'identity_proxy', path, method: req.method, body: req.body, headers: req.headers };
    
    return this.identityService.send(pattern, {})
      .pipe(
        timeout(5000),
        catchError(error => {
          res.status(500).json({ message: 'Lỗi kết nối đến Identity Service', error: error.message });
          return throwError(() => error);
        })
      );
  }

  @All('product/*')
  handleProductRequests(@Req() req: Request, @Res() res: Response): Observable<any> {
    const path = req.url.replace('/api/product', '');
    const pattern = { cmd: 'product_proxy', path, method: req.method, body: req.body, headers: req.headers };
    
    return this.productService.send(pattern, {})
      .pipe(
        timeout(5000),
        catchError(error => {
          res.status(500).json({ message: 'Lỗi kết nối đến Product Service', error: error.message });
          return throwError(() => error);
        })
      );
  }

  @All('order/*')
  handleOrderRequests(@Req() req: Request, @Res() res: Response): Observable<any> {
    const path = req.url.replace('/api/order', '');
    const pattern = { cmd: 'order_proxy', path, method: req.method, body: req.body, headers: req.headers };
    
    return this.orderService.send(pattern, {})
      .pipe(
        timeout(5000),
        catchError(error => {
          res.status(500).json({ message: 'Lỗi kết nối đến Order Service', error: error.message });
          return throwError(() => error);
        })
      );
  }
}