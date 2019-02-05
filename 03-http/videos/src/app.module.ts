import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsuarioService} from "./usuario/usuario.service";
import {UsuarioModule} from "./usuario/usuario.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsuarioEntity} from "./usuario/usuario-entity";
import {LibroEntity} from "./libro/libro.entity";
import {PaginaEntity} from "./pagina/pagina.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '192.168.99.100',
            port: 32769,
            username: 'jossue',
            password: 'Jossue_123',
            database: 'dutanjossue',
            dropSchema: false, //para que al sincronizar primero se borre y se vuelva a crear con los cambios
            entities: [
                UsuarioEntity,
                LibroEntity,
                PaginaEntity,
            ], //entidades
            synchronize: true, //sincronizando las tablas con el código, false si está ya creada
        }),
        UsuarioModule
    ], //Modules
    controllers: [AppController], //Controllers
    providers: [
        AppService
    ], //Servicios
})
export class AppModule {
}
