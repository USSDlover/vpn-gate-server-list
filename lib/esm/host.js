import { Extractors } from "./extractors";
export class Host {
    country;
    hostDetail;
    sessions;
    quality;
    ssl;
    l2tp;
    openVpn;
    msSstp;
    volunteers;
    score;
    constructor(tr) {
        const tdContainer = tr.children('td');
        this.country = Extractors.country(tdContainer.eq(0));
        this.hostDetail = Extractors.hostDetail(tdContainer.eq(1));
        this.sessions = Extractors.sessions(tdContainer.eq(2));
        this.quality = Extractors.quality(tdContainer.eq(3));
        this.ssl = Extractors.ssl(tdContainer.eq(4));
        this.l2tp = Extractors.l2tp(tdContainer.eq(5));
        this.openVpn = Extractors.openVpn(tdContainer.eq(6));
        this.msSstp = Extractors.msSstp(tdContainer.eq(7));
        this.volunteers = Extractors.volunteers(tdContainer.eq(8));
        this.score = Extractors.score(tdContainer.eq(9));
    }
}
