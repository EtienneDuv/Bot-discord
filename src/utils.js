/* eslint-disable max-len */
let fs = require('fs');
const https = require('https');

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
    get: (host, path) => {
        return new Promise((resolve, reject) => {
            const options = {
                host,
                path,
                method: 'GET'
            };
            const req = https.request(options, (res) => {
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    return reject(new Error('statusCode=' + res.statusCode));
                }
                let body = [];
                res.on('data', (chunk) => body.push(chunk));
                res.on('end', () => {
                    try {
                        body = JSON.parse(Buffer.concat(body).toString());
                    } catch(e) {
                        reject(e);
                    }
                    resolve(body);
                });
            });
            req.on('error', (e) => {
                reject(e.message);
            });
            // send the request
            req.end();
        });
    },
    imperialToMetric: (str) => str.replaceAll(/(?<number>\d+)[- ](?<unit>foot|feet)/ig, (_, number) => {
        return `${Math.floor(number * 0.3048)}m`;
    })
};