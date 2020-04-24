export default poopMike;

// randomly decided whether to poop on Mike
function poopMike(message) {

	const addChance = 2;
	const randomNum = (Math.random() * 100);

	// Determine whether to poop Mike or not
	if (randomNum >= addChance) {
		// If result is greater than likelihood, end.
		console.info('Mike has narrowly escaped pooping');
		return;
	}
	// poop on Mike
	message.react('💩');
	console.info("Mike's been pooped");
	
}