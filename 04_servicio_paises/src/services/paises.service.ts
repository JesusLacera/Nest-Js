import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class PaisesService {
  urlGlobal: string = 'https://restcountries.com/v2/all';
  constructor(private http: HttpService) {}

  async findByContinente(continente: string): Pais[] {
    const response = await this.http.get(this.urlGlobal);
    response.
  }

  async findAllContinentes():Promise<any> {
    const response = await this.http.get(this.urlGlobal);
    return response.pipe(map(r=>r.data));
  }

  async findPoblacionMax(): Pais {
    const response = await this.http.get(this.urlGlobal);
  }
}
