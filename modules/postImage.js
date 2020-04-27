export default postImage;

import Discord from 'discord.js';

// links to images to be posted in embed object
const images = {
	honk: 'https://i.imgur.com/H8prJzb.png',
	mikefoot: 'https://i.imgur.com/YkTM41E.png',
	exasperatedPepe: 'https://i.imgur.com/VG3DkWB.jpg'
}

// seconds before users can trigger this module again
const cooldown = 60;

// holds references to recently posted images. Uses the keys from `images` as references
const postedRecently = new Set();

function postImage(message, image) {

	// create image embed
	const embed = new Discord.RichEmbed({
		color: 0x36393F,
		image: {
			url: images[image]
		}
	});

	// if the image was postedRecently, do nothing. Otherwise, put a cooldown on the posted image so it can't be spammed
	if (!postedRecently.has(image)) {
		message.channel.send(embed);
		if (message.content.match(/^mikefoot$/i)) message.delete(); // delete the message if it's 'mikefoot' and nothing else to entertain Chris
		postedRecently.add(image);
		setTimeout(() => postedRecently.delete(image), cooldown * 1000);
	}

}