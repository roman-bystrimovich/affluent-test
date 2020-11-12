const puppeteer = require('puppeteer');

let browser;

class BrowserWindow {
    static async getWindow() {
        if (!browser) {
            browser = await puppeteer.launch({headless: false});
        }
        return await browser.newPage();
    }
}

module.exports = BrowserWindow;
