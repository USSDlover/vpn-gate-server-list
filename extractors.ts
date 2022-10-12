import {IHost} from './host';
import Cheerio = cheerio.Cheerio;

export const Extractors = {
    country: (td: Cheerio): IHost['country'] => {
        return td.text();
    },
    hostDetail: (td: Cheerio): IHost['hostDetail'] => {
        const spansContainer = td.children('span');
        const cleanUpDDNS = (ddns: string): string | undefined => {
            if (!ddns)
                return undefined;
            else
                return ddns.replace(')', '').replace('(', '');
        }
        return {
            ip: spansContainer.eq(0).text(),
            DDNS: cleanUpDDNS(spansContainer.eq(1).text())
        }
    },
    // session: (td: Cheerio): IHost['session'] => {},
    // quality: (td: Cheerio): IHost['quality'] => {},
    // ssl: (td: Cheerio): IHost['ssl'] => {},
    // l2tp: (td: Cheerio): IHost['l2tp'] => {},
    // openVpn: (td: Cheerio): IHost['openVpn'] => {},
    // msSstp: (td: Cheerio): IHost['msSstp'] => {},
    // volunteers: (td: Cheerio): IHost['volunteers'] => {},
    // score: (td: Cheerio): IHost['score'] => {}
}