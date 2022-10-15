import Cheerio = cheerio.Cheerio;
import {Extractors} from "./extractors";

interface IHostDetail {
    // First <span>
    ip: string;
    // Second <span>
    DDNS: string | undefined;
}
interface ISession {
    // Inside <b>
    count: number;
    // inside <span>
    time: string;
    // innerText
    totalUsers: number;
}
interface IQuality {
    // first <b> + inside <span>
    speed: string;
    // inside second <b>
    ping: string;
    // inside third <b>
    totalTransferredData: string;
    // innerText
    loggingPolicy: string;
}
interface ISSL {
    // value of the <a> 'href' attribute
    guide: string | undefined;
    /**
     * after first <br> (innerText).
     * @example "TCP: 1332"
     */
    tcp: number | undefined;
    /**
     * after second <br> (innerText).
     * @example "UDP: Supported"
     */
    udp: boolean | undefined;
}
interface IL2TP {
    // value of the <a> 'href' attribute
    guide: string | undefined;
}
interface IOpenVPN {
    // value of the <a> 'href' attribute
    configFile: string;
    /**
     * after first <br> (innerText).
     * @example "TCP: 1332"
     */
    tcp: number | undefined;
    /**
     * after second <br> (innerText).
     * @example "UDP: 1384"
     */
    udp: number | undefined;
}
interface IMsSstp {
    // value of the <a> 'href' attribute
    guide: string;
    // inside <p> > <span> > <b> > <span>
    hostName: string;
}
type IVolunteers = string[];
type IScore = number;

/**
 *  The exact pattern from fetched HTML
 *  <table> > <tbody> > tr + tr > td
 */
export interface IServer {
    // First <td> and can use innerText
    country: string;
    // Second <td> and contains two <span>
    hostDetail: IHostDetail;
    // Thirds <td> have three value
    sessions: ISession;
    // 4th <td> have four value
    quality: IQuality;
    // 5th <td> have three value
    ssl?: ISSL;
    // 6th <td> have three value
    l2tp?: IL2TP;
    // 7th <td> have three value
    openVpn?: IOpenVPN;
    // 8th <td> have three value
    msSstp?: IMsSstp;
    /**
     * 9th <td> have three value
     * List of <i>
     *     Content inside '<i> > <b>'
     */
    volunteers: IVolunteers;
    /**
     * 10th and last <td> have three value
     * inside '<b> > <span>'
     */
    score: IScore;
}

export class Server {
    country: string;
    hostDetail: IHostDetail;
    sessions: ISession;
    quality: IQuality;
    ssl?: ISSL;
    l2tp?: IL2TP;
    openVpn?: IOpenVPN;
    msSstp?: IMsSstp;
    volunteers: IVolunteers;
    score: IScore;

    constructor(tr: Cheerio) {
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