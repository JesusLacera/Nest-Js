import { Injectable } from '@nestjs/common';
import { Cuenta } from 'src/model/Cuenta';

@Injectable()
export class CuentasService {
  cuentas: Cuenta[] = [
    new Cuenta(
      'ES2100123456789012345678',
      15230.75,
      'Carlos Méndez',
      'Cuenta Corriente',
    ),
    new Cuenta(
      'ES3200765432109876543210',
      840.5,
      'Laura Sánchez',
      'Cuenta de Ahorro',
    ),
    new Cuenta(
      'ES4100987654321098765432',
      5000.0,
      'Miguel Torres',
      'Cuenta Corriente',
    ),
    new Cuenta(
      'ES5100234567890123456789',
      120.9,
      'Andrea López',
      'Cuenta Nómina',
    ),
    new Cuenta(
      'ES6100345678901234567890',
      9800.0,
      'Luis Rodríguez',
      'Cuenta Empresa',
    ),
    new Cuenta(
      'ES7200456789012345678901',
      320.75,
      'María González',
      'Cuenta Ahorro',
    ),
    new Cuenta(
      'ES8300567890123456789012',
      7200.0,
      'Javier Morales',
      'Cuenta Corriente',
    ),
    new Cuenta(
      'ES9400678901234567890123',
      210.0,
      'Patricia Ruiz',
      'Cuenta Nómina',
    ),
    new Cuenta(
      'ES0500789012345678901234',
      14500.25,
      'Fernando Gil',
      'Cuenta Empresa',
    ),
    new Cuenta(
      'ES1600890123456789012345',
      75.1,
      'Elena Navarro',
      'Cuenta Ahorro',
    ),
  ];

  alta(nuevaCuenta: Cuenta): boolean {
    if (!this.cuentas.some((c) => c.numero_cuenta == c.numero_cuenta)) {
      this.cuentas.push(nuevaCuenta);
      return true;
    }
    return false;
  }

  buscarNumeroCuenta(numero_cuenta: string): Cuenta {
    return this.cuentas.find((c) => c.numero_cuenta == numero_cuenta);
  }

  buscarPorTipo(tipo_cuenta: string): Cuenta[] {
    return this.cuentas.filter((c) => c.tipo_cuenta == tipo_cuenta);
  }

  buscarPorSaldoMin(saldoMin: number): Cuenta[] {
    return this.cuentas.filter((c) => c.saldo >= saldoMin);
  }

  deleteByNumeroCuenta(numeroCuenta: string): void {
    this.cuentas = this.cuentas.filter((c) => c.numero_cuenta != numeroCuenta);
  }
}
