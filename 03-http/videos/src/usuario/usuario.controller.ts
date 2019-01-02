// usuario controller

import {Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import {Usuario, UsuarioService} from "./usuario.service";

@Controller('Usuario')
export class UsuarioController {

    constructor(
        private readonly _usuarioService: UsuarioService,
    ) {

    }

    @Get('inicio')
    inicio(
        @Res() response,
        @Query('accion') accion: string,
        @Query('nombre') nombre: string,
        @Query('busqueda') busqueda: string,
    ) {
        //header
        let mensaje;

        if (accion && nombre) {
            switch (accion) {
                case 'actualizar':
                    mensaje = `Registro ${nombre} actualizado`;
                    break;
                case 'crear':
                    mensaje = `Registro ${nombre} creado`;
                    break;
                case 'borrar':
                    mensaje = `Registro ${nombre} borrado`;
                    break;
            }
        }

        let usuarios: Usuario[];

        if (busqueda) {
            usuarios = this._usuarioService
                .buscarPorNombreOBiografia(busqueda);
        }
        else {
            usuarios = this._usuarioService.usuarios
        }

        response.render('inicio', {
            nombre: 'Adrian',
            // arreglo: [1, 2, 3, 4, 5],
            arreglo2: usuarios,
            mensaje: mensaje
        })

    }

    @Get('crear-usuario')
    crearUsuario(@Res() response) {
        //header
        response.render('crear-usuario')
    }

    @Get('actualizar-usuario/:idUsuario')
    actualizarUsuario(
        @Param('idUsuario') idUsuario: string,
        @Res() response
    ) {
        const usuarioAActualizar = this
            ._usuarioService
            .buscarPorId(Number(idUsuario));

        response.render(
            'crear-usuario', {
                usuario: usuarioAActualizar
            }
        )
    }


    @Post('actualizar-usuario/:idUsuario')
    actualizarUsuarioFormulario(
        @Param('idUsuario') idUsuario: string,
        @Res() response,
        @Body() usuario: Usuario
    ) {
        usuario.id = +idUsuario;

        this._usuarioService
            .actualizar(+idUsuario, usuario);

        const parametrosConsulta = `?accion=actualizar&nombre=${usuario.nombre}`;

        response.redirect('/Usuario/inicio' + parametrosConsulta);

    }

    @Post('crear-usuario')
    crearUsuarioFormulario(
        @Body() usuario: Usuario,
        @Res() response,
    ) {
        this._usuarioService.crear(usuario);
        const parametrosConsulta = `?accion=crear&nombre=${usuario.nombre}`;
        response.redirect('/Usuario/inicio' + parametrosConsulta)

    }

    @Post('borrar/:idUsuario')
    borrar(
        @Param('idUsuario') idUsuario, //es el nombre que se recibe de idUsuario
        @Res() response
    ) {
        const usuarioBorrado = this._usuarioService.borrar(Number(idUsuario));
        const parametrosConsulta = `?accion=borrar&nombre=${usuarioBorrado.nombre}`;

        response.redirect('/Usuario/inicio' + parametrosConsulta);
    }
}