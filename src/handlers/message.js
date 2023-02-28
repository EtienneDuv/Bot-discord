const c = require('../commands');
const {tryToSend} = require('../utils');
const {errorMessage, helperMessage} = require('../constants/strings');

module.exports = (_client, msg) => {
    const words = msg.content.split(' ');
    const command = words.shift().substr(1).toLowerCase();
    const message = words.join(' ');

    if (msg.author.bot) return;
    if (command.length === 0) return;
    // Skip if more than one `!`
    if (/^!{2,}/.test(msg.content)) return;

    // ----------------------------------
    // MESSAGES IN DISCORD SERVER
    // ----------------------------------
    if (msg.channel.type === 'text' && msg.content[0] == '!') {
        const mapping = {
            dice    : () => tryToSend(msg.channel, c.dice(msg)),
            m       : () => c.monster(msg),
            monsters: () => c.listMonsters(msg),
            ms      : () => c.listMonsters(msg),
            s       : () => c.spell(msg),
            spells  : () => c.listSpells(msg),
            ss      : () => c.listSpells(msg),

            help: () => tryToSend(msg.channel, helperMessage),
            link: (text) => tryToSend(msg.channel, c.link(text)),
        };

        // msg.delete();

        // Handle any bug in commands
        try {
            if (command in mapping) return mapping[command](message);
            if (/^\d*d\d+/.test(command)) return mapping.dice();
        } catch (error) {
            console.log(error);
            return tryToSend(msg.channel, errorMessage);
        }
    }
};
