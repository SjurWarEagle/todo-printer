import { Controller, Get, Query } from '@nestjs/common';
import {PrinterService} from "./printer.service";
import {TodoistService} from "./todoist.service";

@Controller('app')
export class AppController {
  constructor(private readonly printerService: PrinterService,private readonly todoistService: TodoistService) {}

  @Get('printText')
  public async getPrintText(@Query('text')text:string): Promise<void> {
    await this.printerService.doPrintText(text, true);
  }

  @Get('printToDo')
  public async getPrintToDo(): Promise<void> {
    const todoText = await this.todoistService.getOneRandomTodo();

    await this.printerService.doMinion(false);
    await this.printerService.doPrintText(todoText, true);
  }

  @Get('printMinion')
  public async getPrintMinion(): Promise<void> {
    await this.printerService.doMinion(true);
  }
}
