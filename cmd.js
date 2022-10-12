const {rmdir, rename, existsSync} = require('fs')

module.exports = {
    clean: () => {
        if (!existsSync('lib'))
            return;
        rmdir(`lib`, {recursive: true}, (e) => { if (e) throw e; console.log('old lib removed')});
    },
    move: () => {
        rename(`./lib/esm/index.js`, "./lib/esm/index.mjs", (e) => { if (e) throw e; console.log('output renamed') });
    }
}