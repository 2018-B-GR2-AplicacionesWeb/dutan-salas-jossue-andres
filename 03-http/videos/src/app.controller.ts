import {Get, Controller, Request, HttpCode, HttpException, Query, Param} from '@nestjs/common';
import { AppService } from './app.service';
import {Response} from "supertest";
import {resolve} from "url";
import {of} from "../../../02-Typescript/node_modules/rxjs";
import {Observable} from "rxjs/index";

// http://192.168.1.2:3000/Usuario/saludar  METODO -> GET

@Controller('Usuario')
export class AppController {

  nombre:string = 'Adrian';

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
  ):string{
    return idUsuario;
  }

  @Get('despedirse') //método
  @HttpCode(201)
  despedirse(): Promise<string> {
    return new Promise<string>(
    (resolve,reject)=>{
          throw new HttpException({
              mensaje: 'Error en despedirse',
          }, 400)
      }
    )

  }

  @Get('tomar')
  @HttpCode(201)
  tomar():string{
    return 'Estoy borracho';
  }

    @Get('saludarObservable') //método
    saludarObservable(): Observable<string> {
        return of('Hola mundo');
    }
}
