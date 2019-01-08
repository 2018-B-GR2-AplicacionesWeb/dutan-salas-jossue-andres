import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario-entity";
import {FindManyOptions, Repository} from "typeorm";

@Injectable()

export class UsuarioService {
    usuarios: Usuario[] = [
        {
            nombre: 'Adrian',
            biografia: 'Doctor',
            id: 1
        },
        {
            nombre: 'Jossue',
            biografia: 'Estudiante',
            id: 2
        },
    ]

    registroActual = 3;

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository: Repository<UsuarioEntity>,
    ) {
    }

    buscar(parametros?: FindManyOptions<UsuarioEntity>)
        : Promise<UsuarioEntity[]> {
        return this._usuarioRepository.find(parametros);
    }

    /*
    crear(nuevoUsuario: Usuario): Usuario {
        nuevoUsuario.id = this.registroActual;
        this.registroActual++;
        this.usuarios.push(nuevoUsuario);
        return nuevoUsuario;
    }
    */

    async crear(nuevoUsuario: Usuario): Promise<UsuarioEntity> {
        //Instanciar una entidad -> .create
        const usuarioEntity = this._usuarioRepository.create(nuevoUsuario);

        //Guardar una entiad en la BDD -> .save()
        const usuarioCreado = await this._usuarioRepository.save(usuarioEntity);

        return usuarioCreado;
    }

    buscarPorId(idUsuario: number): Promise<UsuarioEntity> {
        return this._usuarioRepository.findOne(idUsuario);
    }

    buscarPorNombreOBiografia(busqueda: string): Usuario[] {
        return this.usuarios.filter(
            (usuario) => {
                //si la busqueda contiene algo del nombre
                //si la busqueda contiene algo de la biografia
                const tieneAlgoEnElNombre = usuario.nombre.includes(busqueda);

                const tieneAlgoEnLaBio = usuario.biografia.includes(busqueda);
                return tieneAlgoEnElNombre || tieneAlgoEnLaBio
            }
        )
    }

    actualizar(idUsuario: number, nuevoUsuario: Usuario): Promise<UsuarioEntity> {
        nuevoUsuario.id = idUsuario;
        const usuarioEntity = this._usuarioRepository.create(nuevoUsuario);
        return this._usuarioRepository.save(usuarioEntity);
    }

    /*
    borrar(idUsuario: number): Usuario {
        const indiceUsuarioBuscar = this.usuarios
            .findIndex(
                (usuario) => usuario.id === idUsuario
            )
        const usuarioBorrado = JSON.parse(
            JSON.stringify(this.usuarios[indiceUsuarioBuscar])
        )
        this.usuarios.splice(indiceUsuarioBuscar, 1);
        return usuarioBorrado;
    }
    */

    borrar(idUsuario: number): Promise<UsuarioEntity> {

        //Crear una instancia de la entidad en JS
        const usuarioEntityAEliminar = this._usuarioRepository.create(
            {
                id: idUsuario
            }
        )
        return this._usuarioRepository.remove(usuarioEntityAEliminar)
    }
}

export interface Usuario {
    id: number;
    nombre: string;
    biografia: string;
}
