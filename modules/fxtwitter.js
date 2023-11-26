export default fxtwitter;

import getEmoji from './getEmoji.js';

function fxtwitter(message) {

	// get a list of all twitter links in the message and make them fxtwitter links
	const links = message.content
		.match(/https:\/\/(x|twitter)\.com([^\s]+)/gi)
		.map(v => v.replace(/(x|twitter)\.com/ig, "fxtwitter.com"));

	message.channel.send(`Reposting X/Twitter links as FXTwitter links for Discord embeds ${getEmoji('apusmile')} 👍 \n\n${links.join('\n')}`);

}