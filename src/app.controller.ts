import { Controller, Get, Query } from '@nestjs/common';
import {PrinterService} from "./printer.service";

@Controller('app')
export class AppController {
  constructor(private readonly printerService: PrinterService) {}

  @Get('printText')
  getPrintText(@Query('text')text:string): void {
    this.printerService.doPrint(text);
  }
}
