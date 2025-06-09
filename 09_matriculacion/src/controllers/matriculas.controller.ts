import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MatriculasService } from 'src/services/matriculas.service';

@Controller('matriculas')
export class MatriculasController {
  constructor(private readonly matriculasService: MatriculasService) {}

  @Get('matriculas/:idCurso')
  matriculasCurso(@Param('idCurso') idCurso: number) {
    return this.matriculasService.findByCurso(idCurso);
  }

  @Get('cursos')
  cursos() {
    return this.matriculasService.findCursoAll();
  }
}
