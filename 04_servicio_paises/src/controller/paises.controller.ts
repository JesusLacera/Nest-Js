import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePaisesDto } from './dto/create-paises.dto';
import { UpdatePaisesDto } from './dto/update-paises.dto';
import { PaisesService } from './paises.service';

@Controller('paisess')
export class PaisesController {
  constructor(private readonly paisesService: PaisesService) {}

  @Post()
  create(@Body() createPaisesDto: CreatePaisesDto) {
    return this.paisesService.create(createPaisesDto);
  }

  @Get()
  findAll() {
    return this.paisesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paisesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaisesDto: UpdatePaisesDto) {
    return this.paisesService.update(+id, updatePaisesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paisesService.remove(+id);
  }
}
