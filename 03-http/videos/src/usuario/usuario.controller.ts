// usuario controller

import {Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import {Usuario, UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario-entity";
import {Like} from "typeorm";

@Controller('Usuario')
export class UsuarioController {

    constructor(
        private readonly _usuarioService: UsuarioService,
    ) {

    }

    @Get('inicio')
    async inicio(
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

        let usuarios: UsuarioEntity[];

        if (busqueda) {
            const consulta = {
                where:[
                    {nombre: Like(`%${busqueda}%`)},
                    {biografia: Like(`%${busqueda}%`)}
                ]
            };
            usuarios = await this._usuarioService
                .buscar(consulta);
        }
        else {
            usuarios = await this._usuarioService.buscar();
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
    async actualizarUsuario(
        @Param('idUsuario') idUsuario: string,
        @Res() response
    ) {
        const usuarioAActualizar = await this
            ._usuarioService
            .buscarPorId(Number(idUsuario));

        response.render(
            'crear-usuario', {
                usuario: usuarioAActualizar
            }
        )
    }


    @Post('actualizar-usuario/:idUsuario')
    async actualizarUsuarioFormulario(
        @Param('idUsuario') idUsuario: string,
        @Res() response,
        @Body() usuario: Usuario
    ) {
        usuario.id = +idUsuario;

        await this._usuarioService
            .actualizar(+idUsuario, usuario);

        const parametrosConsulta = `?accion=actualizar&nombre=${usuario.nombre}`;

        response.redirect('/Usuario/inicio' + parametrosConsulta);

    }

    @Post('crear-usuario')
    async crearUsuarioFormulario(
        @Body() usuario: Usuario,
        @Res() response,
    ) {
        await this._usuarioService.crear(usuario);
        const parametrosConsulta = `?accion=crear&nombre=${usuario.nombre}`;
        response.redirect('/Usuario/inicio' + parametrosConsulta)

    }

    @Post('borrar/:idUsuario')
    async borrar(
        @Param('idUsuario') idUsuario, //es el nombre que se recibe de idUsuario
        @Res() response
    ) {
        const usuarioEncontrado = await this._usuarioService.buscarPorId(idUsuario);
        await this._usuarioService.borrar(Number(idUsuario));
        const parametrosConsulta = `?accion=borrar&nombre=${usuarioEncontrado.nombre}`;

        response.redirect('/Usuario/inicio' + parametrosConsulta);
    }
}