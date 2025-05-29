import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Movimiento } from 'src/model/movimiento';
import { Between, Repository } from 'typeorm';
import { Cuenta } from 'src/model/Cuenta';

@Injectable()
export class MovimientosService {
  constructor(
    @InjectRepository(Movimiento)
    private movimientosRepository: Repository<Movimiento>,
  ) {}

  save(movimiento: Movimiento): Promise<Movimiento> {
    return this.movimientosRepository.save(movimiento);
  }

  findByidCuenta(idCuenta: number): Promise<Movimiento[]> {
    return this.movimientosRepository.find({
      where: {
        cuenta: {
          numeroCuenta: idCuenta,
        },
      },
      relations: ['movimientos'],
    });
  }

  async findByFecha(
    fechaInical: Date,
    fechaFinal: Date,
  ): Promise<Movimiento[]> {
    const response: Movimiento[] = await this.movimientosRepository.findBy({
      fecha: Between(fechaInical, fechaFinal),
    });
    return response;
  }

  findCuentasPorSaldoMin(saldoMin: number) {}
}
