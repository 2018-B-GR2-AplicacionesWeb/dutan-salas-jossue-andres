import {Get, Controller, Request, HttpCode, HttpException, Query, Param, Res, Post, Body} from '@nestjs/common';
import {AppService} from './app.service';
import {Response} from "supertest";
import {resolve} from "url";
import {of} from "../../../02-Typescript/node_modules/rxjs";
import {Observable} from "rxjs/index";
import {Usuario, UsuarioService} from "./usuario.service";

// http://192.168.1.2:3000/Usuario/saludar  METODO -> GET

@Controller('Usuario')
export class AppController {

    //Constructor NO ES un constructor NORMAL!!

    constructor(
        private readonly _usuarioService: UsuarioService,
    ) {

    }

    nombre: string = 'Adrian';

    @Get('saludar') //método
    saludar(
        @Query() queryParams,
        @Query('nombre') nombre,
    ): string {
        return nombre;
    }

    @Get('segmentoUno/:idUsuario/segmentoDos')
    ruta(
        @Param() todosParametrosRuta,
        @Param('idUsuario') idUsuario,
    ): string {
        return idUsuario;
    }

    @Get('despedirse') //método
    @HttpCode(201)
    despedirse(): Promise<string> {
        return new Promise<string>(
            (resolve, reject) => {
                throw new HttpException({
                    mensaje: 'Error en despedirse',
                }, 400)
            }
        )

    }

    @Get('tomar')
    @HttpCode(201)
    tomar(): string {
        return 'Estoy borracho';
    }

    @Get('inicio')
    inicio(
        @Res() response,
        @Query('accion') accion:string,
        @Query('nombre') nombre:string,
        @Query('busqueda') busqueda: string,
    ) {
        //header
        let mensaje;

        if(accion && nombre){
            switch (accion){
                case 'actualizar':
                    mensaje=`Registro ${nombre} actualizado`;
                    break;
                case 'crear':
                    mensaje=`Registro ${nombre} creado`;
                    break;
                case 'borrar':
                    mensaje=`Registro ${nombre} borrado`;
                    break;
            }
        }

        let usuarios: Usuario[];

        if(busqueda){
            usuarios = this._usuarioService
                .buscarPorNombreOBiografia(busqueda);
        }
        else{
            usuarios = this._usuarioService.usuarios
        }

        response.render('inicio', {
            nombre: 'Adrian',
            // arreglo: [1, 2, 3, 4, 5],
            arreglo2: usuarios,
            mensaje:mensaje
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

        response.redirect('/Usuario/inicio'+parametrosConsulta);

    }

    @Post('crear-usuario')
    crearUsuarioFormulario(
        @Body() usuario: Usuario,
        @Res() response,
    ) {
        this._usuarioService.crear(usuario);
        const parametrosConsulta = `?accion=crear&nombre=${usuario.nombre}`;
        response.redirect('/Usuario/inicio'+parametrosConsulta)

    }

    @Post('borrar/:idUsuario')
    borrar(
        @Param('idUsuario') idUsuario, //es el nombre que se recibe de idUsuario
        @Res() response
    ) {
        const usuarioBorrado = this._usuarioService.borrar(Number(idUsuario));
        const parametrosConsulta = `?accion=borrar&nombre=${usuarioBorrado.nombre}`;

        response.redirect('/Usuario/inicio'+parametrosConsulta);
    }


    @Get('saludarObservable') //método
    saludarObservable(): Observable<string> {
        return of('Hola mundo');
    }
}
