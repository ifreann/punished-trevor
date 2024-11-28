export default poe;

import getEmoji from './getEmoji.js';
import differenceInSeconds from "date-fns/differenceInSeconds/index.js";
import fromUnixTime from "date-fns/fromUnixTime/index.js";

function poe(message) {

	const poeDate = fromUnixTime(1733511600); // 9th November 2024 18:30 PDT

	const diff = differenceInSeconds(poeDate, new Date());
	const days = Math.floor(diff / 86400);
	const hours = Math.floor((diff - days * 86400) / 3600);
	const minutes = Math.floor((diff - days * 86400 - hours * 3600) / 60);
	const seconds = diff - days * 86400 - hours * 3600 - minutes * 60;
	
	let str = `Path of Exile 2 early access in ${days} ${days === 1 ? 'day' : 'days'}`;
	str += `${hours === 0 ? '' : hours === 1 ? `, ${hours} hour` : `, ${hours} hours`}`;
	str += `${minutes === 0 ? '' : minutes === 1 ? `, ${minutes} minute` : `, ${minutes} minutes`}`;
	str += `${seconds === 0 ? '' : seconds === 1 ? ` and ${seconds} second` : ` and ${seconds} seconds`}`;
	str += ` ${getEmoji('apusmile')} 👍`;

	message.channel.send(str);

}