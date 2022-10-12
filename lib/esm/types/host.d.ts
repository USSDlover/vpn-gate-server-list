/// <reference types="cheerio" />
import Cheerio = cheerio.Cheerio;
interface IHostDetail {
    ip: string;
    DDNS: string | undefined;
}
interface ISession {
    count: number;
    time: string;
    totalUsers: number;
}
interface IQuality {
    speed: string;
    ping: string;
    totalTransferredData: string;
    loggingPolicy: string;
}
interface ISSL {
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
    guide: string | undefined;
}
interface IOpenVPN {
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
    guide: string;
    hostName: string;
}
declare type IVolunteers = string[];
declare type IScore = number;
/**
 *  The exact pattern from fetched HTML
 *  <table> > <tbody> > tr + tr > td
 */
export interface IHost {
    country: string;
    hostDetail: IHostDetail;
    sessions: ISession;
    quality: IQuality;
    ssl: ISSL;
    l2tp: IL2TP;
    openVpn: IOpenVPN;
    msSstp: IMsSstp;
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
export declare class Host {
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
    constructor(tr: Cheerio);
}
export {};
//# sourceMappingURL=host.d.ts.map