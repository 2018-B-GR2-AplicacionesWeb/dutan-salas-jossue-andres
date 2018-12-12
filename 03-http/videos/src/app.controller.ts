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
        private readonly _usuarioService:UsuarioService,
    ){

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
    inicio(@Res() response) {
        //header
        response.render('inicio', {
            nombre: 'Adrian',
            // arreglo: [1, 2, 3, 4, 5],
            arreglo2: this._usuarioService.usuarios
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

    @Post('crear-usuario')
    crearUsuarioFormulario(
        @Body() usuario:Usuario,
        @Res() response,
    ) {
        this._usuarioService.crear(usuario);
        response.redirect('/Usuario/inicio')

    }

    @Post('borrar/:idUsuario')
    borrar(
        @Param('idUsuario') idUsuario, //es el nombre que se recibe de idUsuario
        @Res() response
    ){
        this._usuarioService.borrar(Number(idUsuario));
        response.redirect('/Usuario/inicio')
    }


    @Get('saludarObservable') //método
    saludarObservable(): Observable<string> {
        return of('Hola mundo');
    }
}
