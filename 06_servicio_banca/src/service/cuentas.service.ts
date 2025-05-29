import { ClientesService } from './clientes.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/model/cliente';
import { Cuenta } from 'src/model/Cuenta';
import { Movimiento } from 'src/model/movimiento';
import { In, Repository } from 'typeorm';

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
      where: { dni: dni },
      relations: ['cuentas'],
    });
    if (cliente) {
      return cliente.cuentas;
    } else {
      return [];
    }
  }

  //Recibe una cuenta y un array con los dni`s de los titulares
  //que debe tener esa cuenta. El metodo dara de alta dicha cuenta
  //y le asignara esos titulares
  async altaCuenta(cuenta: Cuenta, clientesdni: number[]): Promise<Cuenta> {
    const clientes = await this.clientesRepository.find({
      where: { dni: In(clientesdni) },
    });
    cuenta.clientes = clientes;
    const nuevaCuenta = await this.cuentasRepository.save(cuenta);
    return nuevaCuenta;
  }
}
