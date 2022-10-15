import {Server, IServer} from "./server";

const rp = require('request-promise');
import {load} from "cheerio";

import Root = cheerio.Root;
import Cheerio = cheerio.Cheerio;

const DEFAULT_URL = 'https://www.vpngate.net';

const TABLE_ID = 'vg_hosts_table_id';
const TABLE_HEADER_FIRST_HEADER_COLUMN = 'Country';

let $: Root;
let hostsTable: Cheerio;
const rows: Cheerio[] = [];
const hosts: Server[] = [];

const extractHosts = (): IServer[] => {
    for (let row of rows) {
        hosts.push(new Server(row))
    }
    return hosts;
}

const extractRows = (): IServer[] => {
    let rowContainer = hostsTable.children(`tbody`).children(`tr`);
    let tempRowKeep: Cheerio;
    for (let i = 0; i < rowContainer.length; i++) {
        tempRowKeep = rowContainer.eq(i);
        if (tempRowKeep.children('td').children('b').html() !== TABLE_HEADER_FIRST_HEADER_COLUMN)
            rows.push(tempRowKeep);
    }
    return extractHosts();
}

const extractTable = (): IServer[] => {
    hostsTable = $(`#${TABLE_ID}`).last();
    return extractRows();
}

const loadRoot = (html: any): IServer[] => {
    $ = load(html);
    return extractTable();
}

// TODO: Publish the NPM
export async function ServerList(url: string = DEFAULT_URL): Promise<IServer[]> {
    return new Promise<IServer[]>((resolve, reject) => {
        rp(url)
            .then((html: any) => resolve(loadRoot(html)))
            .catch((err: any) => reject('Error occurred on requesting the HTML from URL:\n' + err));
    });
}