import {Injectable} from "@nestjs/common";

@Injectable()

export class UsuarioService{
    usuarios:Usuario[] = [
        {
            nombre: 'Adrian',
            biografia: 'Doctor',
            id:1
        },
        {
            nombre: 'Jossue',
            biografia: 'Estudiante',
            id:2
        },
    ]

    registroActual = 3;

    crear(nuevoUsuario:Usuario):Usuario{
        nuevoUsuario.id = this.registroActual;
        this.registroActual++;
        this.usuarios.push(nuevoUsuario);
        return nuevoUsuario;
    }

    buscarPorId(idUsuario:number){
        return this.usuarios.find(u => u.id === idUsuario)
    }

    actualizar(idUsuario:number, nuevoUsuario: Usuario):Usuario{
        const indiceUsuarioBuscar = this.usuarios
            .findIndex(
                (usuario)=> usuario.id === idUsuario
            )
        this.usuarios[indiceUsuarioBuscar] = nuevoUsuario;
        return nuevoUsuario;
    }
    borrar(idUsuario:number):Usuario{
        const indiceUsuarioBuscar = this.usuarios
            .findIndex(
                (usuario)=> usuario.id === idUsuario
            )
        const usuarioBorrado = JSON.parse(
            JSON.stringify(this.usuarios[indiceUsuarioBuscar])
        )
        this.usuarios.splice(indiceUsuarioBuscar, 1);
        return usuarioBorrado;
    }
}
export interface Usuario {
    id:number;
    nombre:string;
    biografia: string;
}
