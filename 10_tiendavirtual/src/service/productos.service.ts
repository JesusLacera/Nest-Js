import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoDto } from 'src/Dtos/ProductoDto';
import { Producto } from 'src/model/Producto';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto) private productoRepository:Repository<Producto>
  ){}

   async findAllProducto():Promise<ProductoDto[]>{
    const resultado:Producto[] = await this.productoRepository.find()
    return resultado.map(p=>new ProductoDto(p.codigoProducto,p.producto,p.precioUnitario,p.stock))
  }

  async alta(producto:ProductoDto):Promise<boolean>{
    //buscamos un producto con ese codigo
   const prod:Producto  = await this.productoRepository.createQueryBuilder("producto")
   .where("codigoProducto=:c",{c:producto.codigoProducto})
   .getOne()
   //si existe no se puede dar de alta y devolvemos false
   //si no exsite,se da de alta y devolvemos true 
   if(prod){
    return false;
   }else{
    this.productoRepository.save(producto)
    return true
   }
  }


}
