import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import { INestApplication } from '@nestjs/common';

function displayLinks(port: number) {
    console.log('Startet at http://localhost:' + port);
    console.log('');
    console.log('Api Swagger http://localhost:' + port + '/app/api/');
    console.log('Example http://localhost:' + port + '/app/');
    console.log('Todo http://localhost:' + port + '/app/printToDo');
}

function addSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle('ToDo Printer')
        .setDescription('Bon Printer Endpoint')
        .setVersion('1.0')
        .addTag('print')
        .addTag('local')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
    const port: number = 6363;

    const app = await NestFactory.create(AppModule);
    addSwagger(app);

    await app.listen(port);
    displayLinks(port);
}

bootstrap();
