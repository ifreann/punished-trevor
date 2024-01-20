export default evo;

import getEmoji from './getEmoji.js';
import differenceInSeconds from "date-fns/differenceInSeconds/index.js";
import fromUnixTime from "date-fns/fromUnixTime/index.js";

function evo(message) {

	const evoDate = fromUnixTime(1721257200); // 18th July 2024

	const diff = differenceInSeconds(evoDate, new Date());
	const days = Math.floor(diff / 86400);
	const hours = Math.floor((diff - days * 86400) / 3600);
	const minutes = Math.floor((diff - days * 86400 - hours * 3600) / 60);
	const seconds = diff - days * 86400 - hours * 3600 - minutes * 60;
	
	let str = `Evo 2024 will take place in ${days} ${days === 1 ? 'day' : 'days'}`;
	str += `${hours === 0 ? '' : hours === 1 ? `, ${hours} hour` : `, ${hours} hours`}`;
	str += `${minutes === 0 ? '' : minutes === 1 ? `, ${minutes} minute` : `, ${minutes} minutes`}`;
	str += `${seconds === 0 ? '' : seconds === 1 ? ` and ${seconds} second` : ` and ${seconds} seconds`}`;
	str += ` ${getEmoji('apusmile')} 👍`;

	message.channel.send(str);

}