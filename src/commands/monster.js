const {get, tryToSend} = require('../utils');
const {dndApiUrl} = require('../constants/strings');

module.exports = async (msg) => {
    let [, ...monsterName] = msg.content.split(' ');
    
    if (monsterName.length == 0) {
        return tryToSend(msg.channel, 'Please specify the monster\'s name');
    }

    monsterName = monsterName.join('-').toLowerCase();
  
    let res = await get(dndApiUrl, '/api/monsters/' + monsterName);

    return tryToSend(msg.channel, {
        embed: {
            color    : process.env.COLOR_EMBED_1,
            title    : res.name,
            url      : 'https://' + dndApiUrl + res.url,
            thumbnail: {
                url: 'https://' + dndApiUrl + res.image
            },
            fields: [
                {
                    name  : 'Size',
                    value : res.size,
                    inline: true,
                },
                {
                    name  : 'Hit points',
                    value : res.hit_points,
                    inline: true,
                },
                {
                    name  : '\u200B',
                    value : '\u200B',
                    inline: true,
                },
                ...res.armor_class.map(el => {
                    let value = el.value;
                    if (el.condition) value += ` (${el.condition.name})`;
                    return {
                        name  : `AC (${el.type})`,
                        value : value,
                        inline: true,
                    };
                })
            ],
        }
    });
};