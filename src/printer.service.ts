import {Injectable} from '@nestjs/common';

const escpos = require('escpos');
// install escpos-usb adapter module manually
escpos.USB = require('escpos-usb');
// Select the adapter based on your printer type
const device = new escpos.USB();
// const device  = new escpos.Network('localhost');
// const device  = new escpos.Serial('/dev/usb/lp0');

const options = {encoding: "GB18030" /* default */}
// encoding is optional
const printer = new escpos.Printer(device, options);

@Injectable()
export class PrinterService {

    constructor() {
    }

    public doPrint(text: String): void {
        console.log(`got "${text}" to print`);

        // encoding is optional
        const printer = new escpos.Printer(device, options);

        device.open(function (error) {
            printer
                .font('a')
                .align('ct')
                // .style('bu')
                .size(1, 1)
                .text(text)
        });
    }
}
