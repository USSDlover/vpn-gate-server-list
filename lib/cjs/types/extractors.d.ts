/// <reference types="cheerio" />
import { IHost } from './host';
import Cheerio = cheerio.Cheerio;
export declare const Extractors: {
    country: (td: Cheerio) => IHost['country'];
    hostDetail: (td: Cheerio) => IHost['hostDetail'];
    sessions: (td: Cheerio) => IHost['sessions'];
    quality: (td: Cheerio) => IHost['quality'];
    ssl: (td: Cheerio) => IHost['ssl'] | undefined;
    l2tp: (td: Cheerio) => IHost['l2tp'] | undefined;
    openVpn: (td: Cheerio) => IHost['openVpn'] | undefined;
    msSstp: (td: Cheerio) => IHost['msSstp'] | undefined;
    volunteers: (td: Cheerio) => IHost['volunteers'];
    score: (td: Cheerio) => IHost['score'];
};
//# sourceMappingURL=extractors.d.ts.map