import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Movimiento } from 'src/model/movimiento';
import { Between, DataSource, MoreThan, Repository } from 'typeorm';
import { Cuenta } from 'src/model/Cuenta';
import { Cliente } from 'src/model/cliente';

@Injectable()
export class MovimientosService {
  constructor(
    @InjectRepository(Movimiento)
    private movimientosRepository: Repository<Movimiento>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    private dataSource: DataSource,
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

  async findByCuentaSaldoMin(saldo: number): Promise<Cuenta[]> {
    const resultado = await this.movimientosRepository.find({
      where: {
        cuenta: {
          saldo: MoreThan(saldo),
        },
      },
      relations: ['cuenta'],
    });
    return resultado.map((m) => m.cuenta);
  }

  saldoMedio(): Promise<any> {
    return this.dataSource.query('select avg(saldo) from cuentas');
  }
}
