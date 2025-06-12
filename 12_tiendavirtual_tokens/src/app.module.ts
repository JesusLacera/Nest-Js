import { Module } from '@nestjs/common';
import { PedidosService } from './service/pedidos.service';
import { ProductosService } from './service/productos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './model/Pedido';
import { Producto } from './model/Producto';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PedidosProductosController } from './controller/productos.controller';
import { AutenticacionService } from './service/autenticacion.service';
import { UsuariosService } from './service/usuarios.service';
import { JwtStrategy } from './security/jwt.strategy';
import { AuthentificacionController } from './controller/authentificacion.controller';
import { Usuario } from './model/Usuario';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'nestuser',
    password: 'nestpass',
    database: 'tiendavirtual',
    entities: [Pedido,Producto,Usuario],
    synchronize: false,
  }),
  PassportModule,
  JwtModule.register({
 secret: 'mysecret',
 signOptions: { expiresIn: '1h' },
}),
  TypeOrmModule.forFeature([Pedido,Producto,Usuario])],
  controllers: [PedidosProductosController,AuthentificacionController],
  providers: [PedidosService,ProductosService,AutenticacionService,UsuariosService,JwtStrategy],
})
export class AppModule {}