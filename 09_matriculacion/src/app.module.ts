import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatriculasService } from './services/matriculas.service';
import { MatriculasController } from './controllers/matriculas.controller';
import { Curso } from './models/Curso';
import { Alumno } from './models/Alumno';
import { Matricula } from './models/Matricula';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    })
    ,TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('URL_BD'),
        port: parseInt(config.get('PORT_BD')),
        username: config.get('USERNAME'),
        password: config.get('PASSWORD'),
        database: 'formacion',
        entities: [Curso,Alumno,Matricula],
        synchronize: false, 
      }),
    }) ,
    TypeOrmModule.forFeature([Curso,Alumno,Matricula]),
  ],
  controllers: [MatriculasController],
  providers: [MatriculasService],
})
export class AppModule {}
