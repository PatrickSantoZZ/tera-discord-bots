const log = require('log')('Discord'),
Discord = require('discord.js'),
client = new Discord.Client(),
discordData = require('./discordData')
class DiscordConnection{
    constructor(){
        client.login(discordData.secret)
            .then(()=>{
                this.channel = client.channels.get(discordData.channel)
                log.info('Connected!')
            })
    }
    send(msg) {
        this.channel.send(msg)
    }
}
module.exports = DiscordConnection;