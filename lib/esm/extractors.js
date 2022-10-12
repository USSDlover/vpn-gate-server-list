export const Extractors = {
    country: (td) => {
        return td.text();
    },
    hostDetail: (td) => {
        const spansContainer = td.children('span');
        const cleanUpDDNS = (ddns) => {
            if (!ddns)
                return undefined;
            else
                return ddns.replace(')', '').replace('(', '');
        };
        return {
            ip: spansContainer.eq(0).text(),
            DDNS: cleanUpDDNS(spansContainer.eq(1).text())
        };
    },
    sessions: (td) => {
        const totalUsers = (text) => {
            return Number(text.split(' ')[3].replace(',', ''));
        };
        const count = (text) => {
            return Number(text.split(' ')[0]);
        };
        return {
            count: count(td.children('b').text()),
            time: td.children('span').text(),
            totalUsers: totalUsers(td.text())
        };
    },
    quality: (td) => {
        const loggingPolicy = (text) => {
            const split = text.split(' ');
            return split[5].split(':')[1] + ' ' + split[6];
        };
        return {
            speed: td.children('b').eq(0).children('span').text(),
            ping: td.children('b').eq(1).text(),
            totalTransferredData: td.children('b').eq(2).text(),
            loggingPolicy: loggingPolicy(td.text())
        };
    },
    ssl: (td) => {
        if (!td || td.text().length === 0)
            return;
        const tcp = (text) => {
            if (!text)
                return;
            const split = text.split(' ');
            return Number(split[2].replace('UDP', '').replace(':', ''));
        };
        const udp = (text) => {
            if (!text)
                return;
            return text.includes('Supported');
        };
        return {
            guide: td.children('a').attr('href'),
            tcp: tcp(td.text()),
            udp: udp(td.text())
        };
    },
    l2tp: (td) => {
        if (!td || td.text().length === 0)
            return;
        return {
            guide: td.children('a').attr('href')
        };
    },
    openVpn: (td) => {
        if (!td || td.text().length === 0)
            return;
        const tcp = (text) => {
            if (!text.includes('TCP'))
                return;
            const split = text.split(' ');
            return Number(split[2].replace('UDP:', ''));
        };
        const udp = (text) => {
            if (!text.includes('UDP'))
                return;
            const split = text.split(' ');
            if (text.includes('TCP'))
                return Number(split[3]);
            else
                return Number(split[2]);
        };
        return {
            configFile: td.children('a').attr('href'),
            tcp: tcp(td.text()),
            udp: udp(td.text())
        };
    },
    msSstp: (td) => {
        if (!td || td.text().length === 0)
            return;
        return {
            guide: td.children('a').attr('href'),
            hostName: td.children('p').children('span').children('b').children('span').text()
        };
    },
    volunteers: (td) => {
        const volunteers = [];
        const iContainer = td.children('i');
        for (let i = 0; i < iContainer.length; i++) {
            volunteers.push(iContainer.eq(i).children('b').text());
        }
        return volunteers;
    },
    score: (td) => {
        return Number(td.children('b').children('span').text().replaceAll(',', ''));
    }
};
