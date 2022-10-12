const rp = require('request-promise');
const url = 'http://202.5.221.66:60279';

const TABLE_ID = 'vg_hosts_table_id';

interface IHost {
    // First <td> and can use innerText
    country: string;
    // Second <td> and contains two <span>
    host: {
        // First <span>
        id: string;
        // Second <span>
        DDNS: string;
    };
    // Thirds <td> have three value
    sessions: {
        // Inside <b>
        users: string;
        // inside <span>
        time: string;
        // innerText
        totalUsers: string;
    };
    // 4th <td> have four value
    quality: {
        // first <b> + inside <span>
        speed: string;
        // inside second <b>
        ping: string;
        // inside third <b>
        totalTransferredData: string;
        // innerText
        loggingPolicy: string;
    };
    // 5th <td> have three value
    ssl: {
        // value of the <a> 'href' attribute
        guide: string;
        /**
         * after first <br> (innerText).
         * @example "TCP: 1332"
         */
        tcp: string;
        /**
         * after second <br> (innerText).
         * @example "UDP: Supported"
         */
        udp: boolean;
    };
    // 6th <td> have three value
    l2tp: {
        // value of the <a> 'href' attribute
        guide: string;
    };
    // 7th <td> have three value
    openVpn: {
        // value of the <a> 'href' attribute
        configFile: string;
        /**
         * after first <br> (innerText).
         * @example "TCP: 1332"
         */
        tcp: string;
        /**
         * after second <br> (innerText).
         * @example "UDP: 1384"
         */
        udp: string;
    };
    // 8th <td> have three value
    msSstp: {
        // value of the <a> 'href' attribute
        guide: string;
        // inside <p> > <span> > <b> > <span>
        hostName: string;
    };
    /**
     * 9th <td> have three value
     * List of <i>
     *     Content inside '<i> > <b>'
     */
    volunteers: string[];
    /**
     * 10th and last <td> have three value
     * inside '<b> > <span>'
     */
    score: string;
}

rp(url)
    .then(html => console.log('HTML Successfully loaded', html))
    .catch(err => console.error('Error occurred on requesting the HTML from URL', err))