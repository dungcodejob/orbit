import { Body, Controller, Post, UseGuards, Get, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Origin, Public } from '@app/decorators';
import { MessagePattern } from '@nestjs/microservices';
import { AUTH_MESSAGE_PATTERN, COOKIE_NAMES } from '@app/constants';
import { AppConfig, InjectAppConfig, InjectJwtConfig, JwtConfig } from 'apps/identity/configs';
import { Response } from 'express';
import { Request } from 'express';
import { isNil } from 'libs/shared/utils/src';
@Controller()
export class AuthController {

  private readonly _cookiePath = '/api/auth';
  private readonly _isTesting: boolean;
  private readonly _refreshTime: number;

  constructor(
    @InjectAppConfig() private readonly _appConfig: AppConfig,
    @InjectJwtConfig() private readonly _jwtConfig: JwtConfig,
    private readonly _authService: AuthService) {
    this._refreshTime = _jwtConfig.refresh.time;
    this._isTesting = true;
  }

  @Public()
  @MessagePattern(AUTH_MESSAGE_PATTERN.LOGIN)
  async login(@Body() loginDto: LoginDto) {
    return this._authService.login(loginDto);
  }


  @Public()
  @MessagePattern(AUTH_MESSAGE_PATTERN.REGISTER)
  async register(registerDto: RegisterDto) {
    console.log("body", registerDto);
    try {
      return this._authService.register(registerDto);
    }
    catch (error) {
      console.log(error);
      return error;
    }

  }

  // @Post('refresh')
  // async refreshToken(
  //   @Req() req: Request,
  //   @Res() res: Response,
  //   @Origin() origin: string) {

  //   const token = this.getRefreshCookie(req);
  //   const result = await this._authService.refreshTokenAccess(
  //     token,
  //     req.headers.origin,
  //   );

  //   return this.authService.refreshToken(refreshTokenDto.refreshToken);
  // }

  @MessagePattern(AUTH_MESSAGE_PATTERN.VERIFY_TOKEN)
  async verifyAccessToken(token: string) {
    return this._authService.verifyAccessToken(token);
  }

  // @Post('logout')
  // async logout(@Body() refreshTokenDto: RefreshTokenDto) {
  //   return this.authService.logout(refreshTokenDto.refreshToken);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  private saveRefreshCookie(res: Response, refreshToken: string): Response {
    return res.cookie(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
      secure: !this._isTesting,
      httpOnly: true,
      signed: true,
      path: this._cookiePath,
      expires: new Date(Date.now() + this._refreshTime * 1000),
    });
  }

  private getRefreshCookie(req: Request): string {
    const token: string | undefined = req.signedCookies[COOKIE_NAMES.REFRESH_TOKEN];
    if (isNil(token)) {
      throw new UnauthorizedException();
    }

    return token;
  }
}