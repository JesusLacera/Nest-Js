import { Cuenta } from 'src/model/Cuenta';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CuentasService } from 'src/service/cuentas.service';
import { Response } from 'express';

@Controller('bancos')
export class BancoController {
  constructor(private readonly bancoService: CuentasService) {}

  @Post('alta')
  alta(@Body() cuenta: Cuenta, @Res() response: Response): void {
    const resultado: boolean = this.bancoService.alta(cuenta);
    if (resultado) {
      //devolvemos el codigo de estado 200
      response.status(200).send();
    } else {
      //devolvemos el codigo de estado 409
      response.status(409).send();
    }
  }

  @Get('buscarnum/:num')
  buscarPorNumero(@Param('num') numero_cuenta: string): Cuenta {
    return this.bancoService.buscarNumeroCuenta(numero_cuenta);
  }

  @Get('buscarsaldo/:saldo')
  buscarPorSaldo(@Param('saldo') saldoMin: number): Cuenta[] {
    return this.bancoService.buscarPorSaldoMin(saldoMin);
  }

  @Get('buscartipo/:tipo')
  buscarPorTipo(@Param('tipo') tipo_cuenta: string): Cuenta[] {
    return this.bancoService.buscarPorTipo(tipo_cuenta);
  }

  @Delete('eliminar/:num')
  eliminarPorNumero(@Param('num') numeroCuenta: string): void {
    this.bancoService.deleteByNumeroCuenta(numeroCuenta);
  }
}
