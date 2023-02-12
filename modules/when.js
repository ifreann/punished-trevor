export default when;

import puppeteer from 'puppeteer';

async function when(message) {

	const browser = await puppeteer.launch();

	const page = await browser.newPage();

	const query = message.content.slice(6).split(' ').join('-');

	await page.goto(`https://yourcountdown.to/${query}`, { waitUntil: ['load', 'domcontentloaded', 'networkidle0'] });

	// target screenshot element
	const element = await page.$('.vegas-content > .container');

	if (!element) return message.channel.send(`No countdown found. It's either already out or you spelled it wrong <:pepeW:1040297494929743892>`);

	await page.setViewport({width: 770, height: 1200});

	// remove elements interfering with screenshot (cookies overlay, ads, buttons)
	await page.evaluate(() => {
		const selectors = '.qc-cmp2-container, .at-share-dock-outer, .adsense-fallback, .fa-pencil, .fa-image, .fa-calendar ,.add';
		document.querySelectorAll(selectors)
			.forEach(el => el.parentNode.removeChild(el));
	});

  const countdown = await element.screenshot();

	message.channel.send({files: [{ attachment: countdown }]})

	await browser.close();

}