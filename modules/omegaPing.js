export default omegaPing;

function omegaPing(message) {

	// poop the user if they @'d anything but 1 person
	if (message.mentions.users.size !== 1) return message.react('💩');

	// get the @'d user
	const user = message.mentions.users.first();

	console.log(user);

	// @ them 5 times, then dinkdonk. {user} becomes an @name in Discord when concatenated with a string
	for (let i = 0; i < 5; i++) message.channel.send(`# ${user}`); 
	message.channel.send('https://cdn.7tv.app/emote/62f9cabd00630d5b2acd66f0/4x.gif');

}