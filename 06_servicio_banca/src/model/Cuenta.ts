import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Movimiento } from './movimiento';
import { Cliente } from './cliente';

@Entity('cuenta')
export class Cuenta {
  @PrimaryColumn()
  numeroCuenta: number;
  @Column()
  saldo: number;
  @Column()
  tipoCuenta: string;
  @OneToMany(() => Movimiento, (movimiento) => movimiento.cuenta)
  movimientos: Movimiento[];
  @ManyToMany(() => Cliente, (cliente) => cliente.cuentas)
  @JoinTable({
    name: 'titulares',
    joinColumn: {
      name: 'idCuenta',
      referencedColumnName: 'numeroCuenta',
    },
    inverseJoinColumn: {
      name: 'idCliente',
      referencedColumnName: 'dni',
    },
  })
  clientes: Cliente[];
  constructor(numeroCuenta?: number, saldo?: number, tipoCuenta?: string) {
    this.numeroCuenta = numeroCuenta;
    this.saldo = saldo;
    this.tipoCuenta = tipoCuenta;
  }
}
