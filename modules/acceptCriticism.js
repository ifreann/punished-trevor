export default acceptCriticism;

function acceptCriticism(message) {

	const content = message.content;

	if (content.match(/\bgood\s*bot\b/i)) {
		message.react('❤');
	}
	if (content.match(/\bbad\s*bot\b/i)) {
		message.react('💩');
	}

}