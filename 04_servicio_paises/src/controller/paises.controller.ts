import { Controller, Get, Param } from '@nestjs/common';
import { PaisesService } from 'src/services/paises.service';

@Controller('paises')
export class PaisesController {
  constructor(private readonly paisesService: PaisesService) {}

  @Get('continentes')
  continentes() {
    return this.paisesService.findAllContinentes();
  }

  @Get('paisesContinente')
  paisesContinente(@Param('continente') continente: string) {
    return this.paisesService.findByContinente(continente);
  }

  @Get('paisMasPoblado')
  paisMasPoblado() {
    return this.paisesService.findPoblacionMax();
  }
}
