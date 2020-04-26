/* 

https://github.com/saanuregh/discord.js-poll-embed#readme

*/

export default postPoll;

import getEmoji from './getEmoji.js';
import Discord from 'discord.js';

async function postPoll(message) {

	const optionEmojis = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'none', 'ten']
		.map(v => getEmoji(v));

	const [title, ...options] = a.slice(6).split(/\s*\|\s*/);

	if (!title) message.reply('polls need a title. Correct format is `!poll title of poll | option 1 | option 2`.');
	else if (!options || options.length < 3) message.reply('polls need a minimum of 2 options. Correct format is `!poll title of poll | option 1 | option 2`.');

	// create image embed
	const embed = new Discord.RichEmbed({
		color: 0x36393F,
		title: title,
		author: { name: message.author },
		fields: [{
				name: 'Regular field title',
				value: 'Some value here',
			},
			{
				name: '\u200b',
				value: '\u200b',
				inline: false,
			},
			{
				name: 'Inline field title',
				value: 'Some value here',
				inline: true,
			},
			{
				name: 'Inline field title',
				value: 'Some value here',
				inline: true,
			},
			{
				name: 'Inline field title',
				value: 'Some value here',
				inline: true,
			},
		],
		timestamp: new Date(),
		footer: {
			text: 'Some footer text here',
			icon_url: 'https://i.imgur.com/wSTFkRM.png',
		}
	});

	// send initial embed
	message.channel.send(embed);

	// react to embed with options
	message.react('yada yada');

}