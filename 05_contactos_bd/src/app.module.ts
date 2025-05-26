import { Module } from '@nestjs/common';
import { ContactosController } from './controller/contactos.controller';
import { ContactosService } from './service/contactos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contacto } from './model/Contacto';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nestuser',
      password: 'nestpass',
      database: 'agenda',
      entities: [Contacto],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Contacto]),
  ],
  controllers: [ContactosController],
  providers: [ContactosService],
})
export class AppModule {}
