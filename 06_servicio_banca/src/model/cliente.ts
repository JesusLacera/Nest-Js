import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { Cuenta } from './Cuenta';

@Entity('cliente')
export class Cliente {
  @PrimaryColumn()
  dni: number;
  @Column()
  nombre: string;
  @Column()
  direccion: string;
  @Column()
  telefono: number;
  @ManyToMany(() => Cuenta, (cuenta) => cuenta.clientes)
  cuentas: Cuenta[];
  constructor(
    dni?: number,
    nombre?: string,
    direccion?: string,
    telefono?: number,
  ) {
    this.dni = dni;
    this.nombre = nombre;
    this.direccion = direccion;
    this.telefono = telefono;
  }
}
