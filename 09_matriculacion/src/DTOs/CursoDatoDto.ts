export class CursoDatoDto {
  idCurso: number;
  nombre: string;
  constructor(idCurso?: number, nombre?: string) {
    this.idCurso = idCurso;
    this.nombre = nombre;
  }
}
