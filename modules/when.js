export default when;

async function when(message) {

	// const q = `when ${message.content}`;
	// delete this after testing
	const q = `stronghold remaster release date`;
	const key = process.env.punishedTrevorGoogleApiKey;
	const cx = process.env.punishedTrevorSearchEngineKey;
	const num = 10;

	const url = `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&q=${q}&num=${num}`;

	const query = await fetch(url);

	if (query.ok) {
		const data = await query.json();

		const results = data.items.reduce((acc, v) => {
			let str = v.snippet;
			const re = /^\D{3,}\d+, \d{4} \.{3} /i;
			if (re.test(str)) str = str.split(re)[1];
			str = str.replaceAll('...', '');
			return acc + str;
		}, '');

		// look for mentions of days/months
		const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
		const months = ['jan', 'january', 'feb', 'february', 'mar', 'march', 'apr', 'april', 'may', 'jun', 'june', 'jul', 'july', 'aug', 'august', 'sep', 'sept', 'september', 'oct', 'october', 'nov', 'november', 'dec', 'december'];

		
		console.log(results);

	}
	
}

when();