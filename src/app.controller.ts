import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtPayload } from 'jsonwebtoken';
import { AppService } from './app.service';
import { IDecodeResponse } from './core/interfaces/IDecodeResponse';
import { ITokenResponse } from './core/interfaces/ITokenResponse';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('token_create')
  public async createToken(@Payload() data: string): Promise<ITokenResponse> {
    const user: {
      userId: number;
      role: string;
    } = JSON.parse(data);
    return this.appService.createToken(user);
  }

  @MessagePattern('token_decode')
  public async decodeToken(
    @Payload() data: string,
  ): Promise<string | JwtPayload | IDecodeResponse> {
    return this.appService.decodeToken(data);
  }
}
