import { Controller, Get } from '@nestjs/common';
import {PrinterService} from "./printer.service";

@Controller('app')
export class AppController {
  constructor(private readonly printerService: PrinterService) {}

  @Get('printText')
  getPrintText(text:string): void {
    this.printerService.doPrint(text);
  }
}
