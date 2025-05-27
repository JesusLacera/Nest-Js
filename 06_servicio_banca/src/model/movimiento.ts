import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movimientos')
export class Movimiento {
  @PrimaryGeneratedColumn()
  idMovimiento: number;
  @Column()
  idCuenta: number;
  @Column({ type: 'datetime' })
  fecha: Date;
  @Column()
  cantidad: number;
  @Column()
  operacion: string;

  constructor(
    idMovimiento?: number,
    idCuenta?: number,
    fecha?: Date,
    cantidad?: number,
    operacion?: string,
  ) {
    this.idMovimiento = idMovimiento;
    this.idCuenta = idCuenta;
    this.fecha = fecha;
    this.cantidad = cantidad;
    this.operacion = operacion;
  }
}
