import { Module } from '@nestjs/common';
import { MovimientosController } from './controller/movimientos.controller';
import { MovimientosService } from './service/movimientos.service';
import { Movimiento } from './model/movimiento';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nestuser',
      password: 'nestpass',
      database: 'bancabd',
      entities: [Movimiento],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Movimiento]),
  ],
  controllers: [MovimientosController],
  providers: [MovimientosService],
})
export class AppModule {}
