import {Injectable} from '@nestjs/common';

const escpos = require('escpos');
// install escpos-usb adapter module manually
escpos.USB = require('escpos-usb');
// Select the adapter based on your printer type
// const device = new escpos.USB();
// const device  = new escpos.Network('localhost');
// const device  = new escpos.Serial('/dev/usb/lp0');

const options = {encoding: "GB18030" /* default */}
// encoding is optional
// const printer = new escpos.Printer(device, options);

@Injectable()
export class PrinterService {

    constructor() {
    }

    public async doPrint(text: String): Promise<void> {
        console.log(`got "${text}" to print`);

        const device = await escpos.USB.getDevice();
        const printer = await escpos.Printer.create(device);

        await printer.text(text);
        await printer.cut();
        await printer.close();
    }
}
