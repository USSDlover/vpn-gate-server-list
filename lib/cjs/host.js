"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Host = void 0;
const extractors_1 = require("./extractors");
class Host {
    constructor(tr) {
        const tdContainer = tr.children('td');
        this.country = extractors_1.Extractors.country(tdContainer.eq(0));
        this.hostDetail = extractors_1.Extractors.hostDetail(tdContainer.eq(1));
        this.sessions = extractors_1.Extractors.sessions(tdContainer.eq(2));
        this.quality = extractors_1.Extractors.quality(tdContainer.eq(3));
        this.ssl = extractors_1.Extractors.ssl(tdContainer.eq(4));
        this.l2tp = extractors_1.Extractors.l2tp(tdContainer.eq(5));
        this.openVpn = extractors_1.Extractors.openVpn(tdContainer.eq(6));
        this.msSstp = extractors_1.Extractors.msSstp(tdContainer.eq(7));
        this.volunteers = extractors_1.Extractors.volunteers(tdContainer.eq(8));
        this.score = extractors_1.Extractors.score(tdContainer.eq(9));
    }
}
exports.Host = Host;
