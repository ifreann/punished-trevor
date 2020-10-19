import Discord from 'discord.js';
export const client = new Discord.Client(); // makes `client` available to modules

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

// have Trevor log in. Does nothing if he's already logged in
client.login(process.env.BOT_TOKEN);

// generic error/warning handling so Trevor doesn't just crash
client.on('error', e => console.error(e));
client.on('warn', e => console.warn(e));

// main event. Trevor decides how to respond every time a message is posted
client.on('message', message => {

	const authorIsTrevor = message.author.id === '510803012445274112';
	const authorIsDarren = message.author.id === '71612859766800384';
	const authorIsMike = message.author.id === '141641930349084672';
	const authorIsHarry = message.author.id === '210155641468223499';
	const { content } = message;

	// ignore Trevor
	if (authorIsTrevor) return;

	// text match triggers
	if (content.match(/^!e /) && authorIsDarren) evaluate(message);
	else if (content.match(/^!poll/)) poll(message);
	else if (authorIsHarry && content.match(/sea of thieves/i)) postImage(message, 'exasperatedPepe');
	else if (content.match(/^!(un|)pin /)) togglePin(message);
	else if (content.match(/^!say /) && authorIsDarren) say(message);
	else if (content.match(/^gabagool/i)) gabagool(message);
	else if (content.match(/honk/i)) postImage(message, 'honk');
	else if (content.match(/peepoClap/i)) postImage(message, 'peepoClap');
	else if (content.match(/widepeepoHappy/i)) postImage(message, 'widepeepoHappy');
	else if (content.match(/pepeLaugh/i)) postImage(message, 'pepeLaugh');
	else if (content.match(/mikefoot/i)) postImage(message, 'mikefoot');
	else if (content === '!slots') slots(message);
	else if (content.match(/\bu+\s*t+\s*o+\s*g+\s*h+\b/i)) utOgh(message);
	else if (content.match(/^mock/i)) mock(message);
	else if (content.match(/\b(good|bad)\s*bot\b/i)) acceptCriticism(message);
	
	// always has a chance to trigger
	if (authorIsMike) poopMike(message);

});