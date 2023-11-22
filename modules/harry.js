export default harry;

import Jimp from 'jimp';

function harry(message) {

	// if only the command was given and no additional text, default to "playing dota 2"
	if (/^!harry$/i.test(message)) return message.channel.send('https://cdn.discordapp.com/attachments/619900307664535582/1176911873300504618/output.png');

	const str = message.content.slice(7);

	const maxWidth = 275;

	Jimp.read("modules/harryTemplate.png", async (err, template) => {

		if (err) throw err;

		// determine appropriate font to use given the single line 275px width constraint - 32px or 16x fonts
		const fontLarge = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
		const fontMedium = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);

		// try large font first, otherwise default to the medium one
		const strWidth = Jimp.measureText(fontLarge, str);
		const font = strWidth < maxWidth ? fontLarge : fontMedium;

		template.print(
			font,
			162,
			320,
			{
				text: str,
				alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
				alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
			},
			maxWidth,
			35
		);

		const output = await template.getBufferAsync(Jimp.MIME_PNG);

		message.channel.send({files: [{ attachment: output }]})

	});

}