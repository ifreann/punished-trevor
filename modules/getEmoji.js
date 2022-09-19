/* 

	adds emojis to messages by using their :name: rather than client.emojis.finding them every time.
	
	Example usage:

	const eyes = getEmoji('eyes');
	message.channel.send(eyes);

*/

export default getEmoji;

import { client } from '../main.js';

function getEmoji(str) {
	
	return (client.emojis.cache.find(v => v.name === str));

}