const fs = require('fs');
const path = require('path');

const DiscordConnection = require('./discordConnection');
const discord = new DiscordConnection;


module.exports = function Worldbossdiscord(mod) {
	const {command} = mod.require;

	var bams = require('./saved.json'),
	changed = false;

	function addZero(i) 
	{
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}

	function saveJson(obj)
	{
		if (Object.keys(obj).length && changed)
		{
			console.log('Saving field-boss times to the save file...');
			try
			{
				fs.writeFileSync(path.join(__dirname,'./saved.json'), JSON.stringify(obj, null, "\t"));
				changed = false;
			}
			catch (err)
			{
				console.log(err);
				return false;
			}
		}
	}
	
	this.destructor = function() {
		saveJson(bams);
	}
	mod.hook('S_SYSTEM_MESSAGE', 1, (event) => {
		//	console.log(event)	
			const msg = mod.parseSystemMessage(event.message);
			if(msg.id === 'SMT_FIELDBOSS_APPEAR')
			{
				//console.log(msg);
				changed = true;
				let name = getBamName(msg.tokens.npcName);
				bams[name] = "lebt noch";
				discord.send("Worldboss " + name + " ist erschienen");
			}
			else if(msg.id === 'SMT_FIELDBOSS_DIE_GUILD')	
			{
				//console.log(msg);
				changed = true;
				let name = getBamName(msg.tokens.npcname);
				discord.send("Worldboss " + name + " wurde " + "getötet" + " von " + msg.tokens.userName + ' aus der Gilde '+msg.tokens.guildName);
				bams[name] = Date.now() + 5*60*60000 + (30 * 60 * 1000);
				discord.send(name + ": " + makeText(bams[name]));
			}
			else if(msg.id === 'SMT_FIELDBOSS_DIE_NOGUILD')
			{
				//console.log(msg);
				changed = true;
				let name = getBamName(msg.tokens.npcname);
				discord.send("Worldboss " + name + " wurde " + "getötet" + " von " + msg.tokens.userName);
				bams[name] = Date.now() + 5*60*60000 + (30 * 60 * 1000);
				discord.send(name + ": " + makeText(bams[name]));
			}
		});
	
	function getBamName(id)
	{
		switch (id)
		{
			case "@creature:26#5001": return "Ortan";
			case "@creature:51#4001": return "Kelros";
			case "@creature:39#501": return "Hazarr";
			default: return "John Cena";
		}
	}
	command.add('bamtime', () => {
		discord.send("Ortan: " + makeText(bams.Ortan));
		discord.send("Kelros: " + makeText(bams.Kelros));
		discord.send("Hazarr: " + makeText(bams.Hazarr));
	})


function makeText(date)
{
	if(isNaN(date))
	{
		return date;
	}
	if(date < Date.now())
	{
		return "?";
	}
	let startT = new Date(date - (60 * 60 * 1000));
	let endT = new Date(date);
	return "Respawn zwischen " + (addZero(startT.getHours()) + ":" + addZero(startT.getMinutes())) + " - " + (addZero(endT.getHours()) + ":" + addZero(endT.getMinutes()));
}

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