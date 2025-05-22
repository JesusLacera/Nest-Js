import { Module } from '@nestjs/common';
import { PaisesController } from './controller/paises.controller';
import { PaisesService } from './services/paises.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PaisesController],
  providers: [PaisesService],
})
export class AppModule {}
