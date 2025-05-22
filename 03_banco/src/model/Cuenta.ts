export class Cuenta {
  numero_cuenta: string;
  saldo: number;
  titular: string;
  tipo_cuenta: string;

  constructor(
    numero_cuenta?: string,
    saldo?: number,
    titular?: string,
    tipo_cuenta?: string,
  ) {
    this.numero_cuenta = numero_cuenta;
    this.titular = titular;
    this.saldo = saldo;
    this.tipo_cuenta = tipo_cuenta;
  }
}
