import { Module } from '@nestjs/common';
import { MovimientosController } from './controller/movimientos.controller';
import { MovimientosService } from './service/movimientos.service';
import { Movimiento } from './model/movimiento';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuenta } from './model/Cuenta';
import { CuentasController } from './controller/cuentas.controller';
import { CuentasService } from './service/cuentas.service';
import { Cliente } from './model/cliente';

@Module({
  imports: [
    .forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,TypeOrmModule
      username: 'nestuser',
      password: 'nestpass',
      database: 'bancabd',
      entities: [Movimiento, Cuenta, Cliente],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Movimiento, Cuenta, Cliente]),
  ],
  controllers: [MovimientosController, CuentasController],
  providers: [MovimientosService, CuentasService],
})
export class AppModule {}
