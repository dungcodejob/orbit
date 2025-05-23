import { Body, Controller, Post, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from '@app/decorators';
import { MessagePattern } from '@nestjs/microservices';
import { AUTH_MESSAGE_PATTERN } from '@app/constants';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  // async login(@Body() loginDto: LoginDto) {
  //   return this.authService.login(loginDto);
  // }


  @Public()
  @MessagePattern(AUTH_MESSAGE_PATTERN.REGISTER)
  async register(registerDto: RegisterDto) {
    console.log("body",registerDto);
    try {
      return this.authService.register(registerDto);
    }
    catch (error) {
      console.log(error);
      return error;
    }
    
  }

  // @Post('refresh')
  // async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
  //   return this.authService.refreshToken(refreshTokenDto.refreshToken);
  // }

  // @Post('logout')
  // async logout(@Body() refreshTokenDto: RefreshTokenDto) {
  //   return this.authService.logout(refreshTokenDto.refreshToken);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}