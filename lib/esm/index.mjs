import { Host } from "./host";
const rp = require('request-promise');
import { load } from "cheerio";
const url = 'http://202.5.221.66:60279';
const TABLE_ID = 'vg_hosts_table_id';
const TABLE_HEADER_FIRST_HEADER_COLUMN = 'Country';
let $;
let hostsTable;
const rows = [];
const hosts = [];
const extractHosts = () => {
    rows.forEach(row => hosts.push(new Host(row)));
};
const extractRows = () => {
    let rowContainer = hostsTable.children(`tbody`).children(`tr`);
    let tempRowKeep;
    for (let i = 0; i < rowContainer.length; i++) {
        tempRowKeep = rowContainer.eq(i);
        if (tempRowKeep.children('td').children('b').html() !== TABLE_HEADER_FIRST_HEADER_COLUMN)
            rows.push(tempRowKeep);
    }
    extractHosts();
};
const extractTable = () => {
    hostsTable = $(`#${TABLE_ID}`).last();
    extractRows();
};
const loadRoot = (html) => {
    $ = load(html);
    extractTable();
};
rp(url)
    .then((html) => loadRoot(html))
    .catch((err) => console.error('Error occurred on requesting the HTML from URL', err));
