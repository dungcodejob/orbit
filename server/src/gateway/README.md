# API Gateway

## Tổng quan

API Gateway là điểm vào duy nhất cho tất cả các yêu cầu từ client, sau đó định tuyến chúng đến các microservice tương ứng (identity, product, order). API Gateway cung cấp các tính năng như:

- Định tuyến yêu cầu đến các microservice
- Xác thực và phân quyền
- Ghi nhật ký và giám sát
- Xử lý lỗi

## Cấu trúc

```
gateway/
├── gateway.module.ts         # Module chính của API Gateway
├── gateway.controller.ts     # Controller xử lý và định tuyến yêu cầu
├── gateway.service.ts        # Service cung cấp các phương thức tiện ích
├── gateway.middleware.ts     # Cấu hình middleware
├── gateway.health.controller.ts # Controller kiểm tra sức khỏe
└── middleware/
    └── auth.middleware.ts    # Middleware xác thực
```

## Cấu hình

API Gateway được cấu hình để kết nối với các microservice sau:

- Identity Service: TCP, port 3001
- Product Service: TCP, port 3002
- Order Service: TCP, port 3003

## Sử dụng

API Gateway cung cấp các endpoint sau:

- `/api/identity/*`: Định tuyến đến Identity Service
- `/api/product/*`: Định tuyến đến Product Service
- `/api/order/*`: Định tuyến đến Order Service
- `/api/health`: Kiểm tra sức khỏe của các microservice

## Hướng dẫn tích hợp microservice

Để một microservice có thể nhận và xử lý yêu cầu từ API Gateway, cần thực hiện các bước sau:

1. Cập nhật controller của microservice để xử lý các yêu cầu proxy từ API Gateway
2. Đảm bảo microservice đang lắng nghe trên cổng đã cấu hình
3. Triển khai các pattern xử lý yêu cầu tương ứng (ví dụ: `identity_proxy`, `product_proxy`, `order_proxy`)

## Bảo mật

API Gateway sử dụng middleware xác thực để bảo vệ các endpoint. Các endpoint công khai không yêu cầu xác thực bao gồm:

- `/api/identity/auth/login`
- `/api/identity/auth/register`
- `/api/health`