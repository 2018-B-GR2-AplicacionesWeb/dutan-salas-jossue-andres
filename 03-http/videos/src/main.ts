import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
// import * as httpserver from 'http-server'; //js
import {Options} from 'http-server';
import {a} from "./mi-codigo";
// const a = require('./mi-codigo').a;
import * as session from 'express-session';
import * as express from 'express';

const FileStore = require('session-file-store')(session);

// console.log(Options.contentType);
async function bootstrap() {
    console.log(a);
    const app = await NestFactory.create(AppModule);
    app.set('view engine', 'ejs');

    app.use(
        session(
            {
                name: 'server-session-id',
                secret: 'No sera de tomar un traguito',
                resave: false,
                saveUninitialized: true,
                cookie: {secure: false},
                store: new FileStore()
            }
        )
    )

    // Configurar el servidor WEB

    app.use(express.static('publico'));

    // /bootstrap/css/bootstrap.css

    // /bootstrap/js/bootstrap.jsapp.use(express.static('publico'));

    await app.listen(3000);
}

bootstrap();
