const {get, tryToSend, imperialToMetric} = require('../utils');
const {dndApiUrl} = require('../constants/strings');
const classLogo = require('../constants/classLogoUrl');

module.exports = async (msg) => {
    let [, ...spellName] = msg.content.split(' ');
    
    if (spellName.length == 0) {
        return tryToSend(msg.channel, 'Please specify the spell\'s name');
    }

    spellName = spellName.join('-').toLowerCase();
  
    let res = await get(dndApiUrl, '/api/spells/' + spellName);

    let thumbnailUrl = null;
    if (res.classes.length === 1) thumbnailUrl = classLogo[res.classes[0].name];
    
    return tryToSend(msg.channel, {
        embed: {
            color      : process.env.COLOR_EMBED_1,
            title      : res.name,
            description: imperialToMetric(res.desc.join('\n')),
            url        : 'https://' + dndApiUrl + res.url,
            thumbnail  : {
                url: thumbnailUrl
            },
            fields: [
                {
                    name  : 'Level',
                    value : res.level,
                    inline: true,
                },
                {
                    name  : 'Range',
                    value : imperialToMetric(res.range),
                    inline: true,
                },
                {
                    name  : 'Concentration',
                    value : res.concentration ? '✅' : '❌',
                    inline: true,
                },
                {
                    name  : res.classes.length > 1 ? 'Classes' : 'Class',
                    value : res.classes.map(el => el.name).join(', '),
                    inline: false,
                },
            ],
        }
    });
};