import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cuenta } from './Cuenta';

@Entity('movimientos')
export class Movimiento {
  @PrimaryGeneratedColumn()
  idMovimiento: number;
  @Column()
  idCuenta: number;
  @Column({ type: 'date' })
  fecha: Date;
  @Column()
  cantidad: number;
  @Column()
  operacion: string;
  @ManyToOne(() => Cuenta, (cuenta) => cuenta.movimientos)
  @JoinColumn({ name: 'idCuenta', referencedColumnName: 'numeroCuenta' })
  cuenta: Cuenta;
  constructor(
    idMovimiento?: number,
    cuenta?: Cuenta,
    fecha?: Date,
    cantidad?: number,
    operacion?: string,
  ) {
    this.idMovimiento = idMovimiento;
    this.cuenta = cuenta;
    this.fecha = fecha;
    this.cantidad = cantidad;
    this.operacion = operacion;
  }
}
