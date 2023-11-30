export default fxtwitter;

import getEmoji from './getEmoji.js';

function fxtwitter(message) {

	// get a list of all twitter links in the message and make them fxtwitter links
	const links = message.content
		.match(/https:\/\/(x|twitter)\.com([^\s]+)/gi)
		.map(v => v.replace(/(x|twitter)\.com/ig, "fxtwitter.com"));

	message.channel.send(`Posted by ${message.author.displayName} ${getEmoji('apusmile')} 👍 \n\n${links.join('\n')}`);

	// remove the original poster's message to cut down on spam
	message.delete();

}