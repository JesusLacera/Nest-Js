import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Contacto } from 'src/model/Contacto';
import { Response } from 'express';
import { ContactosService } from 'src/service/contactos.service';

@Controller('contactos')
export class ContactosController {
  constructor(private readonly contactosService: ContactosService) {}

  @Post('alta')
  async create(@Body() contacto: Contacto, @Res() response: Response) {
    const resultado: boolean = await this.contactosService.save(contacto);
    if (resultado) {
      response.status(200).send();
    } else {
      response.status(409).send();
    }
  }

  @Get('todos')
  findAll() {
    return this.contactosService.findAll();
  }

  @Get('buscar/:name')
  findOne(@Param('name') nombre: string) {
    return this.contactosService.findByNombre(nombre);
  }

  @Delete('eliminar/:email')
  remove(@Param('email') email: string) {
    return this.contactosService.deleteByEmail(email);
  }
}
