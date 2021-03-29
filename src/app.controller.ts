import { Controller, Get, Query } from '@nestjs/common';
import {PrinterService} from "./printer.service";

@Controller('app')
export class AppController {
  constructor(private readonly printerService: PrinterService) {}

  @Get('printText')
  public async getPrintText(@Query('text')text:string): Promise<void> {
    await this.printerService.doPrint(text);
  }

  @Get('printMinion')
  public async getPrintMinion(): Promise<void> {
    await this.printerService.doMinion();
  }
}
