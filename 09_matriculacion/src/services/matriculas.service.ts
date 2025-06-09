import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alumno } from 'src/models/Alumno';
import { Curso } from 'src/models/Curso';
import { Matricula } from 'src/models/Matricula';
import { Repository } from 'typeorm';
import { MatriculaDatoDto } from 'src/DTOs/MatriculaDatosDto';
import { CursoDatoDto } from 'src/DTOs/CursoDatoDto';

@Injectable()
export class MatriculasService {
  constructor(
    @InjectRepository(Curso) private cursoRepository: Repository<Curso>,
    @InjectRepository(Matricula)
    private matriculaRepository: Repository<Matricula>,
  ) {}

  async findByCurso(idCurso: number): Promise<MatriculaDatoDto[]> {
    const matriculas: Matricula[] = await this.matriculaRepository
      .createQueryBuilder('matriucula')
      .innerJoinAndSelect('matricula.curso', 'c')
      .innerJoinAndSelect('matricula.alumno', 'a')
      .where('c.idCurso=:idCurso', { idCurso: idCurso })
      .getMany();

    return matriculas.map(
      (m) =>
        new MatriculaDatoDto(
          m.alumno.nombre,
          m.alumno.email,
          m.curso.nombre,
          m.nota,
        ),
    );
  }

  async findCursoAll(): Promise<CursoDatoDto[]> {
    const cursos: Curso[] = await this.cursoRepository.find();
    return cursos.map((c) => new CursoDatoDto(c.idCurso, c.nombre));
  }
}
