const { URL } = require('url');

const { email, password } = require('../config').api.affluNet;
const BrowserWindow = require('./helpers/browserWindow');

class AffluNet {
    constructor() {
        this.host = 'https://develop.pub.afflu.net';
    }

    getUrl(path, params) {
        const url = new URL(path, this.host);
        for (let key in params) {
            url.searchParams.append(key, params[key]);
        }
        return url.href;
    }

    async * getTables(startDate = '2020-10-01', endDate = '2020-10-30') {
        const window = await BrowserWindow.getWindow();

        await window.goto(this.getUrl('/login'), { waitUntil: 'networkidle0' });
        await window.type('form.login-form input[name=username]', email);
        await window.type('form.login-form input[name=password]', password);
        await window.click('form.login-form button[type=submit]');
        await window.waitForNavigation({ waitUntil: 'networkidle0' });

        await window.goto(this.getUrl('/list', { type: 'dates', startDate, endDate }), { waitUntil: 'networkidle0' });
        await window.$eval('#launcher', node => node.remove())

        for (let buttonEnabled = true; buttonEnabled;) {
            const rows = await window.$$('div.page-content-body tbody tr');

            const list = await Promise.all(rows.map(row =>
                row.$$eval('td', columns => columns.map(column => column.innerText))));

            yield list.map(([ date, commissions_total, sales_net, leads_net, clicks, epc, impressions, cr ]) =>
                ({ date, commissions_total, sales_net, leads_net, clicks, epc, impressions, cr }));

            const nextButton = await window.$('ul.pagination li.next a[title=Next]');
            const [nextWrapper] = await nextButton.$x('..');
            buttonEnabled = await nextWrapper.evaluate(node => !node.classList.contains('disabled')) 

            if (buttonEnabled) {
                await window.click('ul.pagination li.next a[title=Next]');
                await window.waitFor(1000); //TODO okay for now. Should be done in different way
            }
        }
        
        //TODO move to BrowserWindow
        const browser = await window.browser();
        await browser.close();
    }
}

module.exports = AffluNet;
