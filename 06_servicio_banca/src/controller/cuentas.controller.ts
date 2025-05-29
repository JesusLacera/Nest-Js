import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CuentasService } from 'src/service/cuentas.service';

@Controller('cuentass')
export class CuentasController {
  constructor(private readonly cuentasService: CuentasService) {}

  @Get('buscarPorFecha/:fecha')
  buscarPorFecha(@Param('fecha') fecha: Date) {
    return this.cuentasService.findByMovimientosFecha(fecha);
  }
}
