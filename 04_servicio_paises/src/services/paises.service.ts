import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Paises } from 'src/models/Pais';
import axios from 'axios';

export class PaisesService {
  urlGlobal: string = 'http://restcountries.com/v2/all';

  async findByContinente(continente: string): Promise<Paises[]> {
    const response = await axios.get(this.urlGlobal);
    const paises: Paises[] = response.data
      .filter((p) => p.region == continente)
      .map(
        (p) => new Paises(p.name, p.region, p.population, p.capital, p.flag),
      );
    return paises;
  }
  async findAllContinentes(): Promise<string[]> {
    const response = await axios.get(this.urlGlobal);
    const regions: string[] = response.data //el JSON de la respuesta
      .map((p) => p.region); //Array de string con los nombres de continentes, pero duplicados
    return [...new Set(regions)]; //sin diuplicados
  }

  async findPoblacionMax(): Promise<Paises> {
    const response = await axios.get(this.urlGlobal);
    const paises: Paises[] = response.data.map(
      (p) => new Paises(p.name, p.region, p.population, p.capital, p.flag),
    );
    return paises.reduce((aux, actual) => {
      if (actual.poblacion > aux.poblacion) {
        aux = actual;
      }
      return aux;
    });
  }
}
