import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AutenticacionService } from 'src/service/autenticacion.service';


@Controller('authentificacion')
export class AuthentificacionController {
  constructor(private readonly authentificacionService: AutenticacionService) {}

  @Post('login')
  async login(@Body()data){
    const user:any = await this.authentificacionService.validateUser(data.username,data.password)
    if(!user){
      throw new UnauthorizedException()
    }
    return this.authentificacionService.login(user)
  }
  
}
