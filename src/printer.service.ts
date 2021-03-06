import {Injectable} from '@nestjs/common';

const options = {encoding: "CP860"};// Allows you to use Special Characters as Ç ã á and so on.
const escpos = require('escpos');
escpos.USB = require('escpos-usb');
const path = require('path');

@Injectable()
export class PrinterService {
    private readonly DUMMY_CHAR_WHYEVER = " ";

    constructor() {
    }

    public async doMinionWithText(text: string): Promise<void> {

        const url = 'https://minion.tkunkel.de/render?width=512&height=512&blackWhite=true';
        escpos.Image.load(url, (image) => {

            const device = new escpos.USB();
            const printer = new escpos.Printer(device);

            device.open(() => {
                printer
                    .text(this.DUMMY_CHAR_WHYEVER + text)
                    .raster(image)
                    .then(() => {
                        printer
                            .cut()
                            .close();
                    });
            });
        });
    }


    public async doMinion(lastPrintClosePrinter: boolean): Promise<void> {
        const imgSize = 400;
        const url = `https://minion.tkunkel.de/render?width=${imgSize}&height=${imgSize}&blackWhite=true`;
        escpos.Image.load(url, (image) => {

            const device = new escpos.USB();
            const printer = new escpos.Printer(device, options);

            device.open(() => {

                printer
                    .align('ct')
                    .image(image, 'd24')
                    .then(() => {
                        printer
                            .cut()
                            .close();
                    });
            });
        });
    }

    public async doPrintText(text: String, lastPrintClosePrinter: boolean): Promise<void> {
        console.log(`got "${text}" to print`);

        const device = await escpos.USB.getDevice();
        const printer = await escpos.Printer.create(device);

        // the first char is  missing, so adding a dummy char as "fix"
        await printer.text(this.DUMMY_CHAR_WHYEVER + text);
        if (lastPrintClosePrinter) {
            await printer.cut();
            await printer.close();
        }
    }
}
