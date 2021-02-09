/* 

	Lets approved users use the bot in real-time by typing "!e", then some js. Trevor will only respond if the js you've written actually returns something.

*/

export default evaluate;

import util from 'util';

function evaluate(message, client) {

	const args = message.content.split(' ').slice(1);
	const isPromise = p => p.then ? true : false;

	try {
		const code = args.join(' ');
		let evaled = eval(code);
		if (isPromise(evaled)) {
			evaled.then(evaledPromise => {
				if (typeof evaledPromise !== 'string') evaledPromise = util.inspect(evaledPromise);
				message.channel.send(clean(evaledPromise), { code: 'xl' });
			});
		}
		else {
			if (typeof evaled !== 'string') evaled = util.inspect(evaled);
			message.channel.send(clean(evaled), { code: 'xl' });
		}
	}
	catch (err) {
		message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
	}

	function clean(text) {
		if (typeof text === 'string') {
			return text
				.replace(/`/g, '`' + String.fromCharCode(8203))
				.replace(/@/g, '@' + String.fromCharCode(8203));
		}
		else {
			return text;
		}
	}

}