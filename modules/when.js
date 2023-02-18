export default when;

import puppeteer from 'puppeteer';

// flag to prevent requests being stacked
let busy = false;

// set to true to allow local testing. Enables headful Chromium, prevents browser.close and disables discordjs interactions
const testing = false;
if (testing) when({content: '!when morris'});

async function when(message) {

	if (busy && !testing) return message.channel.send(`Please wait, I'm processing someone else's request <:pepeW:1040297494929743892> 👍`);
	busy = true;

	// remove the !when from the query string
	const query = message.content.slice(6).split(' ').join(' ');

	// feedback for anxious bot users
	if (testing) console.log(`Searching yourcountdown.to for "${query}"`);
	else message.channel.send(`Searching yourcountdown.to for "${query}". Please be patient <:apusmile:908706192107393074> 👍`);

	// args required by Railway for Puppeteer to work
	const browser =
		testing ? await puppeteer.launch({headless: false, args: [`--window-position=500,0`]})
		: await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
	const page = await browser.newPage();

	// go to site
	await page.goto('https://yourcountdown.to/');

	// accept cookies
	try {
		const acceptButton = 'button[mode="primary"]';
		await page.waitForSelector(acceptButton, { timeout: 1000 });
		await page.click(acceptButton);
	}
	catch (e) {
		// skip looking for the cookies button, it was probably already clicked
	}

	// type query into search box. Doesn't work consistently because of a bug, more info here: https://github.com/puppeteer/puppeteer/issues/1648#issuecomment-431755748
	await page.type('#GlobalSearch', query, {delay: 100});

	// remove any search results that are not countdowns
	let numberOfResults;
	try {
		await page.waitForSelector('.results-container > a', { timeout: 1000 });
		numberOfResults = await page.evaluate(() => {
			[...document.querySelector('.results-container').children]
				.filter(v => !v.innerHTML.includes(`red \">Countdown</span>`))
				.forEach(v => v.remove());
			return document.querySelector('.results-container').children.length;
		});
	}
	catch (e) {
		if (testing) return console.log('No results found.');
		else return disappointUser(message, browser, 1);
	}

	// look for a search result. If nothing is there, it probably doesn't exist
	if (!numberOfResults) {
		if (testing) return console.log('No results found after deleting non-countdowns.');
		else return disappointUser(message, browser, 2);
	}

	// click the first search result and wait until it's loaded
	try {
		const href = await page.evaluate(() => document.querySelector('.results-container > a').href);
		await page.goto(href, { waitUntil: ['load', 'domcontentloaded', 'networkidle0'] });
	}
	catch (e) {
		if (testing) return console.log(`Couldn't get href, giving up.`);
		else return disappointUser(message, browser, 3);
	}

	// sets page to a good width for Discord screenshots. Height doesn't matter
	await page.setViewport({width: 770, height: 1200});

	// remove elements interfering with screenshot (cookies overlay, ads, buttons)
	await page.evaluate(() => {
		const selectors = '.qc-cmp2-container, .at-share-dock-outer, .adsense-fallback, .fa-pencil, .fa-image, .fa-calendar ,.add';
		document.querySelectorAll(selectors)
			.forEach(el => el.parentNode.removeChild(el));
	});

	// target screenshot element
	const element = await page.$('.vegas-content > .container');

	// if the element wasn't found, take a screenshot of the page and post it instead
	if (!element) {
		const screenshot = await page.screenshot();
		if (testing) {
			await page.screenshot({path: '_error.png'});
			console.log('Failed at screenshot. Error saved as _error.png');
		}
		else message.channel.send(`Something killed me. Here's the last thing I saw before I died:`, {files: [{ attachment: screenshot }]});
	}
	else {
		const screenshot = await element.screenshot();
		if (testing) {
			await element.screenshot({path: '_result.png'});
			console.log('Result saved as _result.png');
		}
		else message.channel.send({files: [{ attachment: screenshot }]});
	}

	end(browser);
	if (testing) console.log('Finished');

}

async function end(browser) {
	
	if (!testing) await browser.close();
	busy = false;

}

function disappointUser(message, browser, code) {

	message.channel.send(`No countdown found. It's either already out or the site is broken. Or you typed something dumb <:pepeW:1040297494929743892>`);
	end(browser);

}