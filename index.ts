import {Host} from "./host";

const rp = require('request-promise');
import {load} from "cheerio";

import Root = cheerio.Root;
import Cheerio = cheerio.Cheerio;

const url = 'http://202.5.221.66:60279';

const TABLE_ID = 'vg_hosts_table_id';
const TABLE_HEADER_FIRST_HEADER_COLUMN = 'Country';

let $: Root;
let hostsTable: Cheerio;
const rows: Cheerio[] = [];
const hosts: Host[] = [];

const extractHosts = () => {
    rows.forEach(row => hosts.push(new Host(row)));
}

const extractRows = (): void => {
    let rowContainer = hostsTable.children(`tbody`).children(`tr`);
    let tempRowKeep: Cheerio;
    for (let i = 0; i < rowContainer.length; i++) {
        tempRowKeep = rowContainer.eq(i);
        if (tempRowKeep.children('td').children('b').html() !== TABLE_HEADER_FIRST_HEADER_COLUMN)
            rows.push(tempRowKeep);
    }
    extractHosts();
}

const extractTable = (): void => {
    hostsTable = $(`#${TABLE_ID}`).last();
    extractRows();
}

const loadRoot = (html: any): void => {
    $ = load(html);
    extractTable();
}

rp(url)
    .then((html: any) => loadRoot(html))
    .catch((err: any) => console.error('Error occurred on requesting the HTML from URL', err));