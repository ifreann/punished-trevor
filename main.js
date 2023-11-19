import Discord from 'discord.js';
export const client = new Discord.Client({ intents: [3276799] }); // makes `client` available to modules. 3276799 is a bitfield corresponding to bot permissions. 3276799 means "all permissions"

// import modules
import acceptCriticism from './modules/acceptCriticism.js';
import evaluate from './modules/evaluate.js';
import gabagool from './modules/gabagool.js';
import mock from './modules/mock.js';
import poopMike from './modules/poopMike.js';
import postImage from './modules/postImage.js';
import poll from './modules/poll.js';
import say from './modules/say.js';
import slots from './modules/slots.js';
import utOgh from './modules/utOgh.js';
import togglePin from './modules/togglePin.js';

// generic error/warning handling so Trevor doesn't just crash
client.on('error', e => console.error(e));
client.on('warn', e => console.warn(e));

// login to Discord with your client's token
client.login(process.env.BOT_TOKEN);
console.log('Trevor is running...');

// main event. Trevor decides how to respond every time a message is posted
client.on('messageCreate', message => {

	const authorIsTrevor = message.author.id.match(/510803012445274112|1013832791420588223/);
	const authorIsDarren = message.author.id === '71612859766800384';
	const authorIsMike = message.author.id === '141641930349084672';
	const authorIsHarry = message.author.id === '210155641468223499';
	const trevorBetaIsOnline = checkIfTrevorBetaIsOnline(message);
	const { content } = message;

	// ignore Trevor
	if (authorIsTrevor) return;

	// do nothing if beta trevor is also taking commands in the trevordome
	if (!trevorBetaIsOnline) return;

	// text match triggers
	if (content.match(/^!e /) && authorIsDarren) evaluate(message, client);
	else if (content.match(/^!poll/)) poll(message);
	else if (authorIsHarry && content.match(/sea of thieves/i)) postImage(message, 'exasperatedPepe');
	else if (content.match(/^!(un|)pin /)) togglePin(message);
	else if (content.match(/^!say /) && authorIsDarren) say(message);
	else if (content.match(/^gabagool/i)) gabagool(message);
	else if (content.match(/honk/i)) postImage(message, 'honk');
	else if (content.match(/^!bruh$/i)) postImage(message, 'jose');
	else if (content.match(/peepoClap/i)) postImage(message, 'peepoClap');
	else if (content.match(/widepeepoHappy/i)) postImage(message, 'widepeepoHappy');
	else if (content.match(/pepeLaugh/i)) postImage(message, 'pepeLaugh');
	else if (content.match(/mikefoot/i)) postImage(message, 'mikefoot');
	else if (content === '!slots') slots(message);
	else if (content.match(/\bu+\s*t+\s*o+\s*g+\s*h+\b/i)) utOgh(message);
	else if (content.match(/^mock/i)) mock(message);
	else if (content.match(/\b(good|bad)\s*bot\b/i)) acceptCriticism(message);
	else if (content.match(/^!eoin$/i)) postImage(message, 'eoin');
	else if (content.match(/^!shad$/i)) postImage(message, 'shad');
	
	// always has a chance to trigger
	if (authorIsMike) poopMike(message);

});

function checkIfTrevorBetaIsOnline(message) {

	// if trevor beta is doing this, skip this function. This should only be done by main trevor, and only in the Trevordome
	if (client.user.id === '1013832791420588223' && message.channel.id === '517382587090731008') return false;

	// returns true if 1013832791420588223 (trevor beta) is online. Returns false for anything else
	return message.guild.members.fetch('1013832791420588223')
		.then(user => user.presence.status === 'online')
		.catch(e => false);

}