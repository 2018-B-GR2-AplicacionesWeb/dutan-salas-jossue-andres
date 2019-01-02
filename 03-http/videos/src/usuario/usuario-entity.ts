// usuario entity

import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity('db_usuario')//nombre de la tabla
export class UsuarioEntity{
    @PrimaryColumn()
    id: number;

    @Column(
        {
            name: 'nombre_primero',
            type: 'varchar',
            length: 50
        }
    )
    nombrePrimero:string;

    @Column()
    biografia:string;
}