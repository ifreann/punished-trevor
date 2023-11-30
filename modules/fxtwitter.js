export default fxtwitter;

import getEmoji from './getEmoji.js';

function fxtwitter(message) {

	// reaplce twitter links in the message with fxtwitter links
	const fixedMessage = message.content.replace(/(x|twitter)\.com/gi, `fxtwitter.com`);

	message.channel.send(`Posted by ${message.author.displayName} ${getEmoji('apusmile')} 👍 \n\n${fixedMessage}`);

	// remove the original poster's message to cut down on spam
	message.delete();

}