import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Cuenta } from 'src/model/Cuenta';
import { CuentasService } from 'src/service/cuentas.service';
import { Response } from 'express';
@Controller('cuentass')
export class CuentasController {
  constructor(private readonly cuentasService: CuentasService) {}

  @Get('buscarPorFecha/:fecha')
  buscarPorFecha(@Param('fecha') fecha: Date) {
    return this.cuentasService.findByMovimientosFecha(fecha);
  }

  //endpoint que a partir del dni del cliente devuelva sus cuentas.
  //si ese cliente no existe o no tiene una cuanta devuelva un 409

  @Get('buscarPorDni/:dni')
  async buscarPorDni(@Param('dni') dni: number, @Res() response: Response) {
    const cuentas: Cuenta[] = await this.cuentasService.findByDni(dni);
    if (cuentas.length > 0) {
      response.status(200).json(cuentas);
    } else {
      response.status(409).json([]);
    }
  }
}
