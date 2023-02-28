/* eslint-disable max-len */
let fs = require('fs');


module.exports = {
    writeFile         : (absolutePath, str) => fs.writeFileSync(absolutePath, str),
    tryToSend         : (channel, text) => channel.send(text || 'Vous devez spécifier un texte.'),
    tryToSendChannelId: (client, channelId, text) => {
        const channel = client.channels.cache.get(channelId);
        if (!channel) throw new Error('Channel ID not found: ' + channelId);

        module.exports.tryToSend(channel, text);
    },
    getMemberCount: async (client, serverId = process.env.SERVER_ID) => {
        const guild = await client.guilds.fetch(serverId);
        const members = await guild.members.fetch();
        const memberCount = members.filter(member => member.user.bot === false).size;
        return memberCount;
    },
    updateClientActivity: (client) => {
        const serverId = process.env.SERVER_ID;
        return module.exports.getMemberCount(client, serverId).then(memberCount => {
            client.user.setActivity(memberCount + ' utilisateurs', {type: 'WATCHING'});
        });
    },
};