import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Matricula } from './Matricula';
@Entity('alumno')
export class Alumno {
  @PrimaryColumn()
  usuario: string;
  @Column()
  password: string;
  @Column()
  nombre: string;
  @Column()
  email: string;
  @Column()
  edad: number;
  @OneToMany(() => Matricula, m => m.alumno)
  matriculas: Matricula[];
  constructor(
    usuario: string,
    password: string,
    nombre: string,
    email: string,
    edad: number,
  ) {
    this.usuario = usuario;
    this.password = password;
    this.nombre = nombre;
    this.email = email;
    this.edad = edad;
  }
}
