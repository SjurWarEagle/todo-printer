import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PrinterService} from "./printer.service";
import {TodoistService} from "./todoist.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrinterService, TodoistService],
})
export class AppModule {}
