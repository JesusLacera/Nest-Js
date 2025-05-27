import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Movimiento } from 'src/model/movimiento';
import { Between, Repository } from 'typeorm';

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
    return this.movimientosRepository.findBy({ idCuenta: idCuenta });
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
}
