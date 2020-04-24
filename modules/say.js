/* 

	Allows approved user to have Trevor say something, e.g. "!say hello" will have Trevor say "hello". The command is deleted after it's used.

*/

export default say;

function say(message) {

	const content = message.content.slice(5);

	message.channel.send(content);

	// remove the !say command message
	message.delete();

}