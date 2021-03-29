import {Injectable} from '@nestjs/common';

const escpos = require('escpos');
escpos.USB = require('escpos-usb');

@Injectable()
export class PrinterService {
    private readonly DUMMY_CHAR_WHYEVER = " ";

    constructor() {
    }

    public async doMinion(): Promise<void> {
        const device = new escpos.USB();
        const printer = new escpos.Printer(device);
        escpos.Image.load('https://data.whicdn.com/images/143462671/original.jpg', function (image) {
            device.open(function () {

                printer.align('ct')
                    .image(image, 's8')
                    .then(() => {
                        printer.cut().close();
                    });
            });
        });
    }

    public async doPrint(text: String): Promise<void> {
        console.log(`got "${text}" to print`);

        const device = await escpos.USB.getDevice();
        const printer = await escpos.Printer.create(device);

        await printer.text(this.DUMMY_CHAR_WHYEVER + text);
        await printer.cut();
        await printer.close();
    }
}
