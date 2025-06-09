import { IsDate, IsInt, IsNumber } from "class-validator"

//agrupa los datos que se quieren devolver de los pedidos
export class PedidoDatosDto {
    @IsNumber()
    idProducto:string
    @IsInt()
    unidades:number
    @IsNumber()
    total:number
    @IsDate()
    fechaPedido:Date
    constructor(idProducto?:string,unidades?:number,total?:number,fechaPedido?:Date){
        this.idProducto=idProducto
        this.unidades=unidades
        this.total=total
        this.fechaPedido=fechaPedido
    }
}