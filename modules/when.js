export default when;

import puppeteer from 'puppeteer';

// flag to prevent requests being stacked
let busy = false;

async function when(message) {

	if (busy) return message.channel.send(`Please wait, I'm processing someone else's request <:pepeW:1040297494929743892> 👍`);
	
	busy = true;

	// remove the !when from the query string
	const query = message.content.slice(6).split(' ').join(' ');

	// feedback for anxious bot users
	message.channel.send(`Searching yourcountdown.to for "${query}". Please be patient <:apusmile:908706192107393074> 👍`);

	// args required by Railway for Puppeteer to work
	const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
	const page = await browser.newPage();

	// go to site
	await page.goto('https://yourcountdown.to/', { waitUntil: ['load', 'domcontentloaded', 'networkidle0'] });

	// accept cookies
	try {
		const acceptButton = 'button[mode="primary"]';
		await page.waitForSelector(acceptButton, { timeout: 1000 });
		await page.click(acceptButton);
	}
	catch (e) {
		// skip looking for the cookies button, it was probably already clicked
	}

	// type query into search box
  await page.type('#GlobalSearch', query);

	// wait 3 seconds for a search result. If nothing appears, it probably doesn't exist
	try {
		await page.waitForSelector('.results-container > a', { timeout: 3000 });
	}
	catch (e) {
		busy = false;
		return message.channel.send(`No countdown found. It's either already out or the site is broken. Or you typed something dumb <:pepeW:1040297494929743892>`);
	}

	// wait half a second before proceeding, the site can show weird results if you go too fast
	await new Promise(r => setTimeout(r, 500));
	const href = await page.evaluate(() => document.querySelector('.results-container > a').href);

	await page.goto(href, { waitUntil: ['load', 'domcontentloaded', 'networkidle0'] });

	// sets page to a good width for Discord. Height doesn't matter
	await page.setViewport({width: 770, height: 1200});

	// target screenshot element
	const element = await page.$('.vegas-content > .container');

	// remove elements interfering with screenshot (cookies overlay, ads, buttons)
	await page.evaluate(() => {
		const selectors = '.qc-cmp2-container, .at-share-dock-outer, .adsense-fallback, .fa-pencil, .fa-image, .fa-calendar ,.add';
		document.querySelectorAll(selectors)
			.forEach(el => el.parentNode.removeChild(el));
	});

	// screenshot is saved as an image buffer, not a file
  const countdown = await element.screenshot();

	// send the image and close everything
	message.channel.send({files: [{ attachment: countdown }]});
	await browser.close();
	busy = false;

}