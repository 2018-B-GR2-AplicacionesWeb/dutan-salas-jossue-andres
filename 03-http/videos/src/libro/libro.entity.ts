//libro.entity

import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario-entity";
import {PaginaEntity} from "../pagina/pagina.entity";

@Entity('libro')
export class LibroEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        name:'nombre',
        type: 'varchar',
        length: 50,
    })
    nombre:string

    @ManyToOne(
        type => UsuarioEntity, //Tipo de relaciond de muchos a uno
        usuario => usuario.libros //Campo donde nos guarda
    )
    usuario: UsuarioEntity;

    @OneToMany(
        type => PaginaEntity, //Tipo de Dato Un Usuario a muchos Libros[]
        pagina => pagina.libro //Campo de la Foreign Key
    )
    paginas: PaginaEntity[];

}