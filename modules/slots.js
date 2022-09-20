export default slots;

import { client } from '../main.js';
import getEmoji from './getEmoji.js';
import Discord from 'discord.js';
const { EmbedBuilder } = Discord;

function slots(message) {

	// prevent slots being used outside of #bot_command_spam in main server
	if (message.guild.id === '227159445879259137' && message.channel.id !== '309774255560589312') return;

	// the number of possible emojis
	const difficulty = 4;

	// randomly choose n emojis (where n = `difficulty`) from all available to Trevor, and put them in `symbols`
	const allEmojis = client.emojis.cache.map(v => v.name);
	const symbols = {};
	let count = 1;
	while (Object.keys(symbols).length < difficulty) {
		const randomEmoji = allEmojis[Math.floor(Math.random() * allEmojis.length)];
		if (!Object.values(symbols).includes(randomEmoji)) {
			symbols[count] = randomEmoji;
			count++;
		}
	}

	// randomly choose 9 emojis to go in each slot
	const fruits = Array(9)
		.fill()
		.map(v => symbols[Math.floor(Math.random() * difficulty) + 1]);

	// check for winning rows
	let rows = 0;
	let diagonals = 0;
	if (fruits[0] === fruits[1] && fruits[1] === fruits[2]) rows += 1;
	if (fruits[3] === fruits[4] && fruits[4] === fruits[5]) rows += 1;
	if (fruits[6] === fruits[7] && fruits[7] === fruits[8]) rows += 1;
	if (fruits[0] === fruits[4] && fruits[4] === fruits[8]) diagonals += 1;
	if (fruits[2] === fruits[4] && fruits[4] === fruits[6]) diagonals += 1;

	// build Embed description string `output`
	const output = `\n\n🌟 🌠 🌃 🌟 🌠 🌃\n\n➫ ${getEmoji(fruits[0])} ❚ ${getEmoji(fruits[1])} ❚ ${getEmoji(fruits[2])} ➫\n\n➫ ${getEmoji(fruits[3])} ❚ ${getEmoji(fruits[4])} ❚ ${getEmoji(fruits[5])} ➫\n\n➫ ${getEmoji(fruits[6])} ❚ ${getEmoji(fruits[7])} ❚ ${getEmoji(fruits[8])} ➫\n\n🌟 🌠 🌃 🌟 🌠 🌃 \n\n`;

	// build Embed footer string based on winning rows, if there are any
	const result = rows === 3 ? '***！ ！ ！   Ｊ Ａ Ｃ Ｋ Ｐ Ｏ Ｔ   ！ ！ ！***' :
		diagonals === 2 ? '**X GON GIVE IT TO YA!** ***TWO DIAGONALS!!!***' :
		rows === 2 ? '**2 rows!?** ***wowee!!!***' :
		rows === 1 || diagonals === 1 ? '3 in a row! **WAOW!**' :
		'Better luck next time idiot XD';

	// build Embed
	const embed = new EmbedBuilder({
		color: 0xFDAB41,
		title: result,
		description: output,
		footer: {
			icon_url: 'https://cdn.discordapp.com/emojis/296819423640158219.png',
			text: 'bottom text'
		}
	});

	// "W I N !" in loud ascii letters
	const ascii = '```██╗    ██╗    ██╗    ███╗   ██╗    ██╗\n██║    ██║    ██║    ████╗  ██║    ██║\n██║ █╗ ██║    ██║    ██╔██╗ ██║    ██║\n██║███╗██║    ██║    ██║╚██╗██║    ╚═╝\n╚███╔███╔╝    ██║    ██║ ╚████║    ██╗\n ╚══╝╚══╝     ╚═╝    ╚═╝  ╚═══╝    ╚═╝```';

	// send the embed along with the ascii if you won
	if (rows || diagonals) message.channel.send(ascii);
	message.channel.send({ embeds: [embed] });

}