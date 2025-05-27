import { MovimientosService } from 'src/service/movimientos.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Movimiento } from 'src/model/movimiento';
@Controller('movimientos')
export class MovimientosController {
  constructor(private readonly movimientosService: MovimientosService) {}

  @Post('movimiento')
  create(@Body() movimiento: Movimiento): void {
    this.movimientosService.save(movimiento);
  }

  @Get('fecha')
  BuscarPorFechas(
    @Query('fechaInicial') fechaInicial: Date,
    @Query('fechaFinal') fechaFinal: Date,
  ): Promise<Movimiento[]> {
    return this.movimientosService.findByFecha(fechaInicial, fechaFinal);
  }

  @Get('/cuenta/:idCuenta')
  consultarCuenta(@Param('idCuenta') idCuenta: number): Promise<Movimiento[]> {
    return this.movimientosService.findByidCuenta(idCuenta);
  }
}
