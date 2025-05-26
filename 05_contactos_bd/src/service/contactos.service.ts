import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contacto } from 'src/model/Contacto';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ContactosService {
  constructor(
    @InjectRepository(Contacto)
    private contactosRepository: Repository<Contacto>,
  ) {}
  //no se permiten contactos con el mismo mail
  //un contacto con email existente no se dara de alta y se devolvera false
  //si el alta es posible deolvera trueb
  async save(contacto: Contacto): Promise<boolean> {
    const resultado: Contacto = await this.contactosRepository.findOneBy({
      email: contacto.email,
    });
    if (resultado) {
      return false;
    } else {
      this.contactosRepository.save(contacto);
      return true;
    }
  }

  findByNombre(nombre: string): Promise<Contacto> {
    return this.contactosRepository.findOneBy({ nombre: nombre });
  }

  findAll(): Promise<Contacto[]> {
    return this.contactosRepository.find();
  }

  async deleteByEmail(email: string): Promise<boolean> {
    //devuelve un boolean indicando si se a eliminado o no
    const result: DeleteResult = await this.contactosRepository.delete({
      email: email,
    });
    return result.affected > 0;
  }
}
