import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/model/cliente';
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
    @InjectRepository(Cliente)
    private clientesRepository: Repository<Cliente>,
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

  //Cuentas asociada a titular donde Dni se proporciona como parametro

  async findByDni(dni: number): Promise<Cuenta[]> {
    const cliente: Cliente = await this.clientesRepository.findOne({
      where:{dni: dni}
      ,
      relations:["cuentas"]  
  });
    if (cliente) {
      return cliente.cuentas;
    } else {
      return [];
    }

  }
}
