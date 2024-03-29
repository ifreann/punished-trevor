export default roll;

function roll(message) {

	const options = message.content.slice(6).split(',');

	const option = options[Math.floor(Math.random() * options.length)].trim();

	message.channel.send(option);

}