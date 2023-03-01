const {get, tryToSend} = require('../utils');
const {dndApiUrl} = require('../constants/strings');

module.exports = async (msg) => {
    let res = await get(dndApiUrl, '/api/magic-items/');

    let arg = msg.content.split(' ')[1];
    if (arg) arg = arg.toLowerCase();

    if (arg && /^[a-z]$/.test(arg)) {
        res.results = res.results.filter(el => el.index.startsWith(arg));
        res.count = res.results.length;
    }
    if (arg && /^[a-z]{2,}$/.test(arg)) {
        res.results = res.results.filter(el => el.index.includes(arg));
        res.count = res.results.length;
    }

    const msgContents = [];
    let str = '';
    res.results.forEach(el => {
        str += el.name + '\n';
        if (str.length > 3500) {
            msgContents.push(str);
            str = '';
        }
    });
    msgContents.push(str);

    if (msgContents.length == 1) {
        return tryToSend(msg.channel, {
            embed: {
                title      : `List of magi items (${res.count})`,
                description: msgContents[0],
                color      : process.env.COLOR_EMBED_1,
            }
        });
    }
    
    return msgContents.forEach((content, i) => {
        tryToSend(msg.channel, {
            embed: {
                title      : `List of magi items (${res.count}, ${i+1}/${msgContents.length})`,
                description: content,
                color      : process.env.COLOR_EMBED_1,
            }
        });
    });
};