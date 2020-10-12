export default postImage;

// links to images to be posted in embed object
const images = {
	honk: {
		url: 'https://i.imgur.com/H8prJzb.png',
		cooldown: 60,
		deleteTriggerMessage: false
	},
	mikefoot: {
		url: 'https://i.imgur.com/YkTM41E.png',
		cooldown: 60,
		deleteTriggerMessage: true
	},
	exasperatedPepe: {
		url: 'https://i.imgur.com/VG3DkWB.jpg',
		cooldown: 60,
		deleteTriggerMessage: false
	},
	peepoClap: {
		url: 'https://media.discordapp.net/attachments/619900307664535582/765268809467953192/peepoClap.gif',
		cooldown: 0,
		deleteTriggerMessage: true
	},
	widepeepoHappy: {
		url: 'https://cdn.discordapp.com/attachments/517382587090731008/750353440680443914/4.png',
		cooldown: 0,
		deleteTriggerMessage: true
	}
};

// holds references to recently posted images. Uses the keys from `images` as references
const postedRecently = new Set();

function postImage(message, imageReference) {

	const { url, cooldown, deleteTriggerMessage } = images[imageReference];

	const messageOnlyContainsTrigger = message.content.match(RegExp(`^${imageReference}$`, 'i'));

	// if the image was postedRecently, do nothing. Otherwise, put a cooldown on the posted image so it can't be spammed
	if (!postedRecently.has(imageReference)) {
		message.channel.send(url);
		if (deleteTriggerMessage && messageOnlyContainsTrigger) message.delete();
		if (cooldown) {
			postedRecently.add(imageReference);
			setTimeout(() => postedRecently.delete(imageReference), cooldown * 1000);
		}		
	}

}