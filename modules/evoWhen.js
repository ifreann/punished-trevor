export default evoWhen;

import dayjs from "dayjs";
import getEmoji from './getEmoji.js';

function evoWhen(message) {

	const now = dayjs();
	const evo = dayjs(1659747600000);
	const evoSunday = dayjs(1659848400000);
	const evoEnds = dayjs(1659916800000);

	// if evo is over
	if (now.isAfter(evoEnds)) {
		return message.react(`${getEmoji('despair')}`);
	}
	// if evo is underway
	else if (now.isAfter(evo)) {
		const stream = `https://www.twitch.tv/evo${now.isAfter(evoSunday) ? '' : 3}`;
		return message.channel.send(`Evo is underway ${getEmoji('apusmile')}👍 ${stream}`);
	}

	const days = evo.diff(now, 'day');	
	const hours = evo.diff(now, 'hour') - (days * 24);
	const minutes = evo.diff(now, 'minute') - (days * 1440) - (hours * 60);
	const countdown = `Evo Tekken will start in ${days ? days + (days === 1 ? ' day' : ' days') : ''}${(!days) || !hours && !minutes ? '' : hours && minutes ? ', ' : ' and '}${hours ? hours + (hours === 1 ? ' hour' : ' hours') : ''}${(!hours) || !days && !hours ? '' : minutes ? ' and ' : ''}${minutes ? minutes + (minutes === 1 ? ' minute' : ' minutes') : ''} ${getEmoji('apusmile')}👍`;

	message.channel.send(countdown);

}