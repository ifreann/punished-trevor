export default togglePin;

async function togglePin(message) {

	const content = message.content;
	const command = content.split(' ')[0].toLowerCase();
	const id = content.split(' ')[1];
	const messageToBePinned = await message.channel.fetchMessage(id);

	if (command === '!pin') messageToBePinned.pin();
	else if (command === '!unpin') messageToBePinned.unpin();

}