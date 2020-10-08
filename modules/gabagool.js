/* 

	add :pinched_fingers: at the beginning, end, and between every word of the last message sent

*/

export default gabagool;

function gabagool(message) {

	message.channel.fetchMessages({ limit: 2 })
		.then(lastMessages => {
			const lastMessage = lastMessages.last().content;

			// failsafe for new channels
			if (!lastMessage) return;

			// if there's 2 or more :pinched_fingers:, poop the author for their transgressions
			const pinchedFingersCount = (lastMessage.match(/:pinched_fingers:/g) || []).length;
			if (pinchedFingersCount > 1) return message.react('💩');

			const gabagooledMessage = `:pinched_fingers: ${lastMessage.replace(/ /g, ' :pinched_fingers: ')} :pinched_fingers:`;			
			message.channel.send(gabagooledMessage);
		})
		.catch(console.error);

}