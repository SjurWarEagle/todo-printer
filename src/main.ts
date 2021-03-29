import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
    const port: number = 6363;

    const app = await NestFactory.create(AppModule);
    await app.listen(port);

    console.log('Startet at http://localhost:' + port);
    console.log('Example http://localhost:' + port+'/');
}

bootstrap();
