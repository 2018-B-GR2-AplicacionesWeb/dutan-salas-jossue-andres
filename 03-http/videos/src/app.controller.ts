import {
    Get,
    Controller,
    Request,
    HttpCode,
    HttpException,
    Query,
    Param,
    Res,
    Post,
    Body,
    Headers, Session, BadRequestException
} from '@nestjs/common';
import {AppService} from './app.service';
import {Response} from "supertest";
import {resolve} from "url";
import {of} from "../../../02-Typescript/node_modules/rxjs";
import {Observable} from "rxjs/index";
import {Usuario, UsuarioService} from "./usuario/usuario.service";
import session = require("express-session");

// http://192.168.1.2:3000/Usuario/saludar  METODO -> GET

@Controller()
export class AppController {

    //Constructor NO ES un constructor NORMAL!!
    constructor(
        private readonly _usuarioService: UsuarioService,
        // private readonly _appService:AppService,
    ) {

    }

    nombre: string = 'Adrian';

    @Get('saludar') //método
    saludar(
        @Query() queryParams,
        @Query('nombre') nombre,
        @Headers('seguridad') seguridad,
        @Session() session,
    ): string {
        console.log('Session', session);
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


    @Get('saludarObservable') //método
    saludarObservable(): Observable<string> {
        return of('Hola mundo');
    }

    @Get('login')
    loginVista(
        @Res() response
    ) {
        response.render('login');
    }


    @Post('login')
    @HttpCode(200)
    async loginMetodo(
        @Body('username') username: string,
        @Body('password') password: string,
        @Res() response,
        @Session() sesion
    ) {
        const identificado = await this._usuarioService
            .login(username, password);

        if (identificado) {
            sesion.usuario = username;
            response.redirect('/saludar')
        } else {
            throw new BadRequestException({mensaje: 'Error login'})
        }

    }
}
