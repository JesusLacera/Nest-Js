import { IsInt, IsNumber, IsString } from "class-validator"

export class ProductoDto {
    @IsInt()
    codigoProducto:number
    @IsString()
    producto:string
    @IsNumber()
    precioUnitario:number
    @IsInt()
    stock:number
    constructor(codigoProducto?:number,producto?:string,precioUnitario?:number,stock?:number){
        this.codigoProducto=codigoProducto
        this.producto=producto
        this.precioUnitario=precioUnitario
        this.stock=stock
    }
}