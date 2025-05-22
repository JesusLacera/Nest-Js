import { Module } from '@nestjs/common';
import { BancoController } from './contoller/banco.controller';
import { CuentasService } from './service/cuentas.service';

@Module({
  imports: [],
  controllers: [BancoController],
  providers: [CuentasService],
})
export class AppModule {}
