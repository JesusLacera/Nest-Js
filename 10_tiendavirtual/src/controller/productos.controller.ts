import { Roles } from './../../../12_tiendavirtual_tokens/src/security/roles.decorator';
import {
  Body,
  Controller,
  Get,
  Post,
  Res,
} from '@nestjs/common';

import { PedidosService } from 'src/service/pedidos.service';
import { ProductosService } from 'src/service/productos.service';
import { Response } from 'express'
import { ProductoDto } from 'src/Dtos/ProductoDto';
import { PedidoAltaDto } from 'src/Dtos/PedidoAltaDto';


@Controller('tienda')
export class PedidosProductosController {
  constructor(private readonly productosService: ProductosService,
    private readonly pedidosService: PedidosService
  ) {}
 
  //alta de pedidos y productos
  //catalogo de productos y listado de pedidos
  @Roles("admin")
  @Get('productos')
  productos(){
    return this.productosService.findAllProducto();
  }
  @Get('pedidos')
  pedidos(){
    return this.pedidosService.catalogoPedidos();
  }
  @Post('altaProducto')
  async altaProducto(@Body() producto:ProductoDto,@Res() response:Response){
    const resultado:boolean=await this.productosService.alta(producto);
    if(resultado){
      response.status(200).send();
    }else{
      response.status(409).send();
    }
  }
  @Post('altaPedido')
  async altaPedido(@Body() pedido:PedidoAltaDto,@Res() response:Response){
    const resultado:boolean=await this.pedidosService.altaPedido(pedido);
    if(resultado){
      response.status(200).send();
    }else{
      response.status(409).send();
    }
  }
} 