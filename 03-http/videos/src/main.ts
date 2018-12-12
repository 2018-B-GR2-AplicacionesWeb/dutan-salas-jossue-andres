
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as httpserver from 'http-server'; //js
import {Options} from 'http-server';
import {a} from "./mi-codigo";
// const a = require('./mi-codigo').a;

// console.log(Options.contentType);
async function bootstrap() {
  console.log(a);
  const app = await NestFactory.create(AppModule);
  app.set('view engine', 'ejs');
  await app.listen(3000);
}
bootstrap();
