/* 

	https://strawpoll.com/api

	Usage: !poll {{question}}, {{answer 1}}, {{answer 2}}... etc., {{optional: duration, e.g. 10m. Defaults to 5m}}

*/

export default poll;

import fetch from 'node-fetch';
import addMinutes from 'date-fns/addMinutes/index.js';
const defaultPollDuration = 1; // minutes
const apiKey = process.env.STRAWPOLL_API_KEY || '13Y1CDQ6DZK12QZRYJPS8A7A8CVEO3US';
const activePolls = new Set();
const delimiterResponse = `put commas **or** pipes (|'s) between your question/answers. Type !poll for more help.`;
const minArgsResponse = `not enough answers provided - you need 2 at a minimum. Type !poll for more help.`;
const maxArgsResponse = `too many answers provided - you can only have 30 max. Type !poll for more help.`;
const createPollErrorResponse = `Something went wrong when I sent your poll to StrawPoll.`;
const durationShortResponse = `good one! Changing the poll duration to **one minute** to give everyone a chance.`;
const durationLongResponse = `nobody needs this much time to decide anything. Changing the poll duration to **one hour**.`;
const helpResponse = `to create a poll, type your command like this:
	
\`!poll {{question}}, {{answer 1}}, {{answer 2}}... etc., {{optional: duration}}\`

To make sure this works:

1. Make sure there's a space after "!poll".
2. Put commas **or** pipes (|'s) between your question/answers.
3. There is a minimum of 2 answers, and a maximum of 30.
4. Duration defaults to 5 minutes. You may optionally specify a duration in minutes using the format "1m" for 1 minute, "60m" for an hour, etc.`;

async function poll(message) {

	const { content } = message;

	// if the message was just "!poll", explain how to use the command
	const messageHasNoParameters = content.match(/^!poll\s*$/i);
	if (messageHasNoParameters) return message.reply(helpResponse);

	// if the message doesn't have a , or |, explain the need for delimiters
	const messageHasNoValidDelimiters = !content.match(/\||,/);
	if (messageHasNoValidDelimiters) return message.reply(delimiterResponse);

	// define the delimiter and split the message into its arguments accordingly
	const delimiter = content.match(/\|/) ? '|' : ',';
	const args = content.substring(6).split(RegExp(`${delimiter}\s*`));

	// determine if a duration was specified. If it was, store the duration and chop it off the end of the list of arguments
	let duration = defaultPollDuration;
	const durationWasSpecified = args[args.length - 1].match(/\d+m/i);
	if (durationWasSpecified) duration = parseFloat(args.splice(args.length - 1, 1));

	// enforce reasonable poll durations
	if (duration < 1) {
		message.reply(durationShortResponse);
		duration = 1;
	}
	if (duration > 60) {
		message.reply(durationLongResponse);
		duration = 60;
	}

	// determine if a valid number of answers have been provided
	const tooFewAnswers = args.length < 3;
	const tooManyAnswers = args.length > 30;
	if (tooFewAnswers) return message.reply(minArgsResponse);
	if (tooManyAnswers) return message.reply(maxArgsResponse);

	// calculate the end date of the poll
	const deadline = addMinutes(new Date(), duration) + '';

	const [title, ...answers] = args;

	// create the poll
	const pollID = await createPoll(title, answers, deadline);

	// return early if something went wrong creating the poll
	if (!pollID) return message.reply(createPollErrorResponse);

	message.channel.send(`Great success! New poll created at https://strawpoll.com/${pollID}.`);

}

async function createPoll(title, answers, deadline) {

	const response = await fetch('https://strawpoll.com/api/poll', {
		method: 'POST',
		headers: {
			'API-KEY': apiKey,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"poll": {
				"title": title,
				"answers": answers,
				"has_deadline": true,
				"deadline": deadline
			}
		})
	});

	const json = await response.json();
	
	return json.content_id;

}

function getPoll(pollID) {

	return fetch(`https://strawpoll.com/api/poll/${pollID}`, {
		method: 'GET',
		headers: {
			'API-KEY': apiKey,
			'Content-Type': 'application/json'
		}
	})
	.catch(e => console.error(e));

}

function deletePoll(pollID) {

	return fetch('https://strawpoll.com/api/content/delete', {
		method: 'DELETE',
		headers: {
			'API-KEY': apiKey,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"content_id": pollID
		})
	})
	.then(response => {
		if (response.statusText === '200') activePolls.delete(pollID);
	})
	.catch(e => console.error(e));

}