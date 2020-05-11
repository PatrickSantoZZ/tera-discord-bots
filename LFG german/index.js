const fs = require('fs');
const path = require('path');

const DiscordConnection = require('./discordConnection');
const discord = new DiscordConnection;


	let uwuname = null;

module.exports = function LFGCLI(mod) {
	const {command} = mod.require;

	//message account name (your charactername)
	mod.hook('S_LOGIN',14, (event) => {
	uwuname = event.name
	})

	mod.hook('S_CHAT',3, (event) => {
	let newmessage = event.message.replace(/<[^>]*>/g, "").replace(/&.{3}/g, "")
	name = event.name
	message = event.message
	channel = event.channel
	gameId = event.gameId
	isWorldEventTarget = event.isWorldEventTarget
	gm = event.gm
	founder = event.founder
	if(event.channel == 4) { discord.send('[TRADE]'+'['+event.name+'] '+newmessage)}
	if(event.channel == 213) { discord.send('[MEGAPHONE]'+'['+event.name+'] '+newmessage)}
	})
	
function stripOuterHTML(str) {
	return str.replace(/^<[^>]+>|<\/[^>]+><[^\/][^>]*>|<\/[^>]+>$/g, '')
	}

function msgdatetime(str) {
	var MsgDate = new Date();
	var MsgDateString;
	
	MsgDate.setDate(MsgDate.getDate());
	
	MsgDateString = ('0' + MsgDate.getDate()).slice(-2) + '/' + ('0' + (MsgDate.getMonth()+1)).slice(-2) + '/' + MsgDate.getFullYear() + ' ' + ('0' + MsgDate.getHours()).slice(-2) + ':' + ('0' + MsgDate.getMinutes()).slice(-2) + ':' + ('0' + MsgDate.getSeconds()).slice(-2);
	
	return MsgDateString
}

}