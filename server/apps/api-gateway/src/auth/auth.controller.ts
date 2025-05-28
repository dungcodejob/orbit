import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { catchError } from "rxjs";
import { of } from "rxjs";
import { LoginDto } from "./dto/login.dto";




@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        console.log('loginDto',loginDto);
        return this.authService.login(loginDto.emailOrUsername, loginDto.password);
    }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto.email, registerDto.password, registerDto.name).pipe(
            catchError((error) => {
                console.log(error);
                return of(error);
            })
        );
    }
}