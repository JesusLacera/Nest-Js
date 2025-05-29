import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cuenta } from 'src/model/Cuenta';
import { Movimiento } from 'src/model/movimiento';
import { Repository } from 'typeorm';

@Injectable()
export class CuentasService {
  constructor(
    @InjectRepository(Cuenta)
    private cuentasRepository: Repository<Cuenta>,
    @InjectRepository(Movimiento)
    private movimientosRepository: Repository<Movimiento>,
  ) {}

  async findByMovimientosFecha(fecha: Date): Promise<Cuenta[]> {
    const movimientos: Movimiento[] = await this.movimientosRepository.find({
      where: {
        fecha: fecha,
      },
      relations: ['cuentas'],
    });
    return movimientos.map((m) => m.cuenta);
  }
}
