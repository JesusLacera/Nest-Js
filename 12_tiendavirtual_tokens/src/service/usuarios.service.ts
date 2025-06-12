import { Usuario } from './../model/Usuario';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository:Repository<Usuario>

  ){}

  async findByUserName(username:string):Promise<any>{
    return this.usuarioRepository.findOneBy({username:username})
  }

}
