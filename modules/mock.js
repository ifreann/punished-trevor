export default mock;

import getEmoji from './getEmoji.js';

// add ":pepega: :mega: " to the start of a message, if it hasn't already been added
String.prototype.pepegaMega = function() {

	if (!this.match(/^<:pepega:550391707749974056> 📣 /i)) {
		return `${getEmoji('pepega')} 📣 ${this}`;
	}

	return this;

}

// transform a string into sPoNgEbObCaSe
String.prototype.toSpongeCase = function() {

	const r = Math.floor(Math.random() * 2);

	return this
		.toLowerCase()
		.split('')
		.map((v, i) => i % 2 === r ? v : v.toUpperCase())
		.join('');

}


// add a random number of randomly capitalized O's to the beginning/end of a string
String.prototype.addOs = function() {

	const addChance = 50;
	const minOs = 3;
	const maxOs = 10;

	// decide whether to add them or not. Probability expressed as percentage by addChance
	if (Math.floor(Math.random() * 100 / addChance) + 1 !== Math.floor(100 / addChance)) {
		return this;
	}

	// randomly decide whether to add the O's to the start or both ends of the string
	const ends = Math.floor(Math.random() * 3) === 0 ? 'start' : 'both';

	// generate a random number of randomly capitalized O's
	const generateOs = (os = '') => {
		const oCount = Math.floor(Math.random() * (maxOs - minOs + 1) + minOs);
		while (os.length < oCount) os += Math.floor(Math.random() * 2) === 0 ? 'o' : 'O';
		return os;
	};

	// return string with O's in appropriate positions
	return `${generateOs()} ${this} ${ends === 'start' ? generateOs() : ''}`;

}

function mock(message) {

	if (message.content.match(/^mock$/i)) {
		mockLast(message);
	}
	// if someone was @'d
	else if (message.mentions.users.size) {
		mockUser(message);
	}

}

function mockLast(message) {

	message.channel.fetchMessages({ limit: 2 })
		.then(lastMessages => {
			const lastMessage = lastMessages.last().content;
			if (!lastMessage) return;
			const mockedMessage = lastMessage.toSpongeCase().addOs().pepegaMega();
			message.channel.send(mockedMessage);
		})
		.catch(console.error);

}

function mockUser(message) {

	const id = message.mentions.users.first().id;

	message.channel.fetchMessages({ limit: 20 })
		.then(lastMessages => {
			lastMessages = Array.from(lastMessages.values());
			for (let i = 0; i < lastMessages.length; i++) {
				if (id === lastMessages[i].author.id) {
					if (!lastMessages[i].content) return;
					const mockedMessage = lastMessages[i].content.toSpongeCase().addOs().pepegaMega();
					message.channel.send(mockedMessage);
					break;
				}
			}
		})
		.catch(console.error);

}