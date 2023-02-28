const commands = require('../commands');
const {tryToSend} = require('../utils');
const {errorMessage, helperMessage} = require('../../const');

module.exports = (_client, msg) => {
    console.log('Received ', msg.content);
    const words = msg.content.split(' ');
    const command = words.shift().substr(1).toLowerCase();
    const message = words.join(' ');

    if (msg.author.bot) return;
    if (command.length === 0) return;
    if (/^!{2,}/.test(msg.content)) return;

    // ----------------------------------
    // MESSAGES IN DISCORD SERVER
    // ----------------------------------
    if (msg.channel.type === 'text' && msg.content[0] == '!') {
        const mapping = {
            dice: () => tryToSend(msg.channel, commands.dice(msg)),
            help: () => tryToSend(msg.channel, helperMessage),
            link: (text) => tryToSend(msg.channel, commands.link(text)),
        };

        // msg.delete();

        // Handle any bug in commands
        try {
            console.log(msg.content, /^\d*d\d+/.test(command));
            if (command in mapping) return mapping[command](message);
            if (/^\d*d\d+/.test(command)) return mapping.dice();
        } catch (error) {
            console.log(error);
            return tryToSend(msg.channel, errorMessage);
        }
    }
};
