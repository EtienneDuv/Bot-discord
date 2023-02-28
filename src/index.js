const path = require('path'); 
require('dotenv').config({path: path.join(__dirname, '../.env')});
const handlers = require('./handlers');
const {Client} = require('discord.js');

const client = new Client();

// Overwrite console.log to keep log file
if (process.env.ENV === 'PROD') {
    let fs = require('fs');
    let log_file = fs.createWriteStream('./debug.log', {flags: 'a'});
    let log_stdout = process.stdout;
    console.log = (text) => {
        const now = new Date().toLocaleString('FR');
        const string = `[${now}] ${text}\n`;
        log_file.write(string);
        log_stdout.write(string);
    };
    
    //Delete each month 2628000000
    setInterval(() => fs.truncate('./debug.log', 0, ()=>console.log('[LOGS DELETED]')), 1209600000); 
}

client.inProcessAdvert = {};

// All DiscordJs events here: https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelCreate
client.on('ready', () => handlers.ready(client));
client.on('message', msg => handlers.message(client, msg));

client.login(process.env.TOKEN);
