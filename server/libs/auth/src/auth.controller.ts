import { COOKIE_NAMES } from '@app/shared/constants';
import { Origin, Public } from '@app/shared/decorators';
import { isNil } from '@app/shared/utils';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { BacklistService } from './services/backlist.service';
import { InjectJwtConfig, JwtConfig } from '../jwt.config';

@Controller('auth')
export class AuthController {
  private readonly _cookiePath = '/api/auth';
  private readonly _isTesting: boolean;
  private readonly _refreshTime: number;

  constructor(
    @InjectJwtConfig() private readonly _jwtConfig: JwtConfig,
    private readonly _authService: AuthService,
    private readonly _backlistService: BacklistService,
  ) {
    this._refreshTime = _jwtConfig.refresh.time;
    this._isTesting = true;
  }

  @Public()
  @Post('login')
  async login(
    @Res() res: Response,
    @Origin() origin: string | undefined,
    @Body() loginDto: LoginDto,
  ) {
    const result = await this._authService.login(loginDto, origin);
    this.saveRefreshCookie(res, result.refreshToken).status(200).json(result);
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    console.log('body', registerDto);
    try {
      return this._authService.register(registerDto);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Post('refresh')
  async refreshToken(
    @Req() req: Request,
    @Res() res: Response,
    @Origin() origin: string,
  ) {
    const token = this.getRefreshCookie(req);
    const result = await this._authService.refreshToken(token, origin);
    this.saveRefreshCookie(res, result.refreshToken).status(200).json(result);
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
    const token: string | undefined =
      req.signedCookies[COOKIE_NAMES.REFRESH_TOKEN];
    if (isNil(token)) {
      throw new UnauthorizedException();
    }

    return token;
  }
}
