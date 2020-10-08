/* 

	add :pinched_fingers: at the beginning, end, and between every word of the last message sent

*/

export default gabagool;

function gabagool(message) {

	message.channel.fetchMessages({ limit: 2 })
		.then(lastMessages => {
			const lastMessage = lastMessages.last().content;
			if (!lastMessage) return;
			const gabagooledMessage = `:pinched_fingers: ${lastMessage.replace(/ /g, ' :pinched_fingers: ')} :pinched_fingers:`;
			message.channel.send(gabagooledMessage);
		})
		.catch(console.error);

}