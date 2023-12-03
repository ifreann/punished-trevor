export default postImage;

// links to images to be posted in embed object
const images = {
	honk: {
		url: 'https://cdn.discordapp.com/attachments/619900307664535582/1104018204830994462/023.png',
		cooldown: 60,
		deleteTriggerMessage: false
	},
	jose: {
		url: 'https://cdn.discordapp.com/attachments/348582277342560257/855118688389431336/Screen_Shot_2021-04-21_at_2.png',
		cooldown: 0,
		deleteTriggerMessage: false
	},
	mikefoot: {
		url: 'https://cdn.discordapp.com/attachments/619900307664535582/1104014473771090083/YkTM41E.png',
		cooldown: 60,
		deleteTriggerMessage: true
	},
	exasperatedPepe: {
		url: 'https://cdn.discordapp.com/attachments/619900307664535582/1104014641543258152/VG3DkWB.jpg',
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
	},
	pepeLaugh: {
		url: 'https://cdn.discordapp.com/attachments/517382587090731008/765565883237007431/pepelaugh.gif',
		cooldown: 0,
		deleteTriggerMessage: true
	},
	eoin: {
		url: "https://cdn.discordapp.com/attachments/348582277342560257/971098566447730788/Screenshot_20220503-181811__01.jpg",
		cooldown: 0,
		deleteTriggerMessage: false
	},
	shad: {
		url: "https://media.tenor.com/cwBfeeCx2Z4AAAAC/american-psycho-patrick-bateman.gif",
		cooldown: 0,
		deleteTriggerMessage: false
	},
	oli: {
		url: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXpudmxxaTEybWZiaHIzeW50dGV4ZTRlZDVmcjVsa2U4MnNidGNoMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PiwyiGolGV8JhvYVcJ/giphy.gif",
		cooldown: 0,
		deleteTriggerMessage: false
	}
};

// holds references to recently posted images. Uses the keys from `images` as references
const postedRecently = new Set();

function postImage(message, imageReference) {

	const { url, cooldown, deleteTriggerMessage } = images[imageReference];

	const messageOnlyContainsTrigger = message.content.match(RegExp(`^${imageReference}$`, 'i'));

	// if the image was postedRecently, put a cooldown on the posted image so it can't be spammed
	if (!postedRecently.has(imageReference)) {
		message.channel.send(url);
		if (deleteTriggerMessage && messageOnlyContainsTrigger) message.delete();
		if (cooldown) {
			postedRecently.add(imageReference);
			setTimeout(() => postedRecently.delete(imageReference), cooldown * 1000);
		}		
	}

}