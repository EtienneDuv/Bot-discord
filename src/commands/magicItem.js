const {get, tryToSend, imperialToMetric} = require('../utils');
const {dndApiUrl} = require('../constants/strings');

module.exports = async (msg) => {
    let [, ...magicItemName] = msg.content.split(' ');
    
    if (magicItemName.length == 0) {
        return tryToSend(msg.channel, 'Please specify the magic item\'s name');
    }
    magicItemName = magicItemName.join('-').toLowerCase();
  
    let res = await get(dndApiUrl, '/api/magic-items/' + magicItemName);

    const colorMap = {
        Common     : 'f1f1f1',
        Uncommon   : '5da40a',
        Rare       : '3e8be8',
        'Very Rare': 'e24bf7',
        Legendary  : 'dd9623',
    };
    
    return tryToSend(msg.channel, {
        embed: {
            color      : colorMap[res.rarity.name],
            title      : res.name,
            description: imperialToMetric(
                res.desc.map(el => `- ${el}\n`).join('')
            ),
            url   : 'https://' + dndApiUrl + res.url,
            fields: [
                {
                    name : 'Rarity',
                    value: res.rarity.name,
                },
            ],
        }
    });
};