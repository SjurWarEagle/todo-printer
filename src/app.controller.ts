import { Controller, Get } from '@nestjs/common';
import {PrinterService} from "./printer.service";

@Controller()
export class AppController {
  constructor(private readonly printerService: PrinterService) {}

  @Get()
  getPrintText(text:string): void {
    this.printerService.doPrint(text);
  }
}
