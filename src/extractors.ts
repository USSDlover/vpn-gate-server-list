import {IServer} from './server';
import Cheerio = cheerio.Cheerio;

export const Extractors = {
    country: (td: Cheerio): IServer['country'] => {
        return td.text();
    },
    hostDetail: (td: Cheerio): IServer['hostDetail'] => {
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
    sessions: (td: Cheerio): IServer['sessions'] => {
        const totalUsers = (text: string): number => {
            return Number(text.split(' ')[3].replace(',', ''));
        }
        const count = (text: string): number => {
            return Number(text.split(' ')[0]);
        }
        return {
            count: count(td.children('b').text()),
            time: td.children('span').text(),
            totalUsers: totalUsers(td.text())
        }
    },
    quality: (td: Cheerio): IServer['quality'] => {
        const loggingPolicy = (text: string): string => {
            const split = text.split(' ');
            return split[5].split(':')[1] + ' ' + split[6];
        }
        return {
            speed: td.children('b').eq(0).children('span').text(),
            ping: td.children('b').eq(1).text(),
            totalTransferredData: td.children('b').eq(2).text(),
            loggingPolicy: loggingPolicy(td.text())
        }
    },
    ssl: (td: Cheerio): IServer['ssl'] | undefined => {
        if (!td || td.text().length === 0)
            return;
        const tcp = (text: string): number | undefined => {
            if (!text)
                return;
            const split = text.split(' ');
            return Number(split[2].replace('UDP', '').replace(':', ''));
        }
        const udp = (text: string): boolean | undefined => {
            if (!text)
                return;
            return text.includes('Supported');
        }
        return {
            guide: td.children('a').attr('href'),
            tcp: tcp(td.text()),
            udp: udp(td.text())
        }
    },
    l2tp: (td: Cheerio): IServer['l2tp'] | undefined => {
        if (!td || td.text().length === 0)
            return;
        return {
            guide: td.children('a').attr('href')
        }
    },
    openVpn: (td: Cheerio): IServer['openVpn'] | undefined => {
        if (!td || td.text().length === 0)
            return;
        const tcp = (text: string): number | undefined => {
            if (!text.includes('TCP'))
                return;
            const split = text.split(' ');
            return Number(split[2].replace('UDP:', ''));
        }
        const udp = (text: string): number | undefined => {
            if (!text.includes('UDP'))
                return;
            const split = text.split(' ');
            if (text.includes('TCP'))
                return Number(split[3])
            else
                return Number(split[2])
        }
        return {
            configFile: td.children('a').attr('href') as string,
            tcp: tcp(td.text()),
            udp: udp(td.text())
        }
    },
    msSstp: (td: Cheerio): IServer['msSstp'] | undefined => {
        if (!td || td.text().length === 0)
            return;
        return {
            guide: td.children('a').attr('href') as string,
            hostName: td.children('p').children('span').children('b').children('span').text()
        }
    },
    volunteers: (td: Cheerio): IServer['volunteers'] => {
        const volunteers: string[] = [];
        const iContainer = td.children('i');
        for (let i = 0; i < iContainer.length; i++) {
            volunteers.push(iContainer.eq(i).children('b').text());
        }
        return volunteers;
    },
    score: (td: Cheerio): IServer['score'] => {
        return Number(td.children('b').children('span').text().replaceAll(',', ''));
    }
}