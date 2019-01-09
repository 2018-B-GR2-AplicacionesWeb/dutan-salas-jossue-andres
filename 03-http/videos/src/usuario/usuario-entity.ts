// usuario entity

import {BeforeInsert, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {LibroEntity} from "../libro/libro.entity";

@Entity('db_usuario')//nombre de la tabla
export class UsuarioEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column(
        {
            name: 'nombre_primero',
            type: 'varchar',
            length: 50,
            default: 'nombre'
        }
    )
    nombre:string;

    @Column(
        {
            nullable:true,
        }
    )
    biografia:string;

    @Column()
    username:string;

    @Column()
    password:string;

    //Trigger
    @BeforeInsert()
    antesDeInsertar(){
        console.log('Ejecutándome antes de insertar')
    }
    @BeforeInsert()
    verificarFuncion(){
        console.log('Ejecutándome después del anterior insertar')
    }

    @OneToMany(
        type => LibroEntity, //Tipo de Dato Un Usuario a muchos Libros[]
        libro => libro.usuario //Campo de la Foreign Key
    )
    libros: LibroEntity[]

}