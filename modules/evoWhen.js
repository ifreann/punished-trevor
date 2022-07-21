export default evoWhen;

import dayjs from "dayjs";
// import getEmoji from './getEmoji.js';

function evoWhen(message) {

	const now = dayjs();
	const evo = dayjs(1659726000000);

	// if evo already passed
	if (now.isAfter(evo)) return message.channel.send(`${getEmoji('despair')}👍`);

	const days = evo.diff(now, 'day');	
	const hours = evo.diff(now, 'hour') - (days * 24);
	const minutes = evo.diff(now, 'minute') - (days * 1440) - (hours * 60);
	const countdown = `Evo will start in ${days ? days + (days === 1 ? ' day' : ' days') : ''}${(!days) || !hours && !minutes ? '' : hours && minutes ? ', ' : ' and '}${hours ? hours + (hours === 1 ? ' hour' : ' hours') : ''}${(!hours) || !days && !hours ? '' : minutes ? ' and ' : ''}${minutes ? minutes + (minutes === 1 ? ' minute' : ' minutes') : ''} ${getEmoji('apusmile')}👍`;

	message.channel.send(countdown);

}