import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { catchError } from "rxjs";
import { of } from "rxjs";
import { LoginDto } from "../auth/dto/login.dto";
import { RegisterDto } from "../auth/dto/register.dto";
import { AccountService } from "./account.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { json } from "express";





@Controller('api/account')
export class AccountController {
    constructor(private readonly accountService: AccountService) { }

    @Get('user')
    @UseGuards(JwtAuthGuard)
    register(@Req() request: Request) {
        return {id: request['user']};
    }
}