import {Injectable} from '@nestjs/common';

const escpos = require('escpos');
escpos.USB = require('escpos-usb');
const path = require('path');

@Injectable()
export class PrinterService {
    private readonly DUMMY_CHAR_WHYEVER = " ";

    constructor() {
    }

    public async doMinion(addCutGap: boolean): Promise<void> {

        const url = 'https://minion.tkunkel.de/render?width=512&height=512&blackWhite=true';
        escpos.Image.load(url, function (image) {

            const device = new escpos.USB();
            const printer = new escpos.Printer(device);

            device.open(function () {

                printer
                    .image(image, 'd24')
                    // .align('ct')
                    .then(() => {
                        if (addCutGap) {
                            printer
                                .cut();
                        }
                        printer
                            .close();
                    });

            });
        });
    }

    public async doPrintText(text: String): Promise<void> {
        console.log(`got "${text}" to print`);

        const device = await escpos.USB.getDevice();
        const printer = await escpos.Printer.create(device);

        // the first char is  missing, so adding a dummy char as "fix"
        await printer.text(this.DUMMY_CHAR_WHYEVER + text);
        await printer.cut();
        await printer.close();
    }
}
