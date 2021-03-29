import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PrinterService} from "./printer.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrinterService],
})
export class AppModule {}
