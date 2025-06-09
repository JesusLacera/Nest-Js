import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoAltaDto } from 'src/Dtos/PedidoAltaDto';
import { PedidoDatosDto } from 'src/Dtos/PedidoDatosDto';
import { Pedido } from 'src/model/Pedido';
import { Producto } from 'src/model/Producto';
import { Repository } from 'typeorm';


@Injectable()
export class PedidosService {
   constructor(
      @InjectRepository(Pedido) private pedidoRepository:Repository<Pedido>,
      @InjectRepository(Producto) private productoRepository:Repository<Producto>
    ){}

   async catalogoPedidos():Promise<PedidoDatosDto[]>{
      const resultado:Pedido[] = await this.pedidoRepository.createQueryBuilder("pedido")
            .innerJoinAndSelect("pedido.producto","p")
            .getMany();
      return resultado.map(m=>new PedidoDatosDto(m.producto.producto,m.unidades,m.total,m.fechaPedido))
    }

   async altaPedido(pedido:PedidoAltaDto):Promise<boolean>{
      const prod:Producto = await this.productoRepository.findOneBy({producto:pedido.producto}) 
      if(!prod || prod.stock<pedido.unidades){
         return false
      }
      
      if(prod){
      //si llega aqui es que hay stock suficiente
      prod.stock=prod.stock-pedido.unidades
      this.productoRepository.save(prod) 
      //por ultimo guardamos el pedido  
      const pedidoNuevo:Pedido = new Pedido (0,pedido.unidades,pedido.unidades*prod.precioUnitario,new Date(),prod) 
      this.pedidoRepository.save(pedidoNuevo)
      }
    } 
   }
