const rp = require('request-promise');
const url = 'http://202.5.221.66:60279';

req(url)
    .then(html => console.log('HTML Successfully loaded', html))
    .catch(err => console.error('Error occurred on requesting the HTML from URL', err))