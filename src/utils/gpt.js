import ChatMessage from "../objects/ChatMessage";
import { Constants } from "../config/constants";
import { toTitleCase } from "./primitiveManipulation";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
	apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Description of models: (https://platform.openai.com/docs/models/overview)
// text-davinci-003: Can do any language task with better quality, longer output, and consistent instruction-following than the curie, babbage, or ada models.
// gpt-3.5-turbo: Most capable GPT-3.5 model and optimized for chat at 1/10th the cost of text-davinci-003. Will be updated with our latest model iteration.
// gpt-4: More capable than any GPT-3.5 model, able to do more complex tasks, and optimized for chat. Will be updated with our latest model iteration.

/** GPT 3 and 3.5/4 use slightly different APIs, but we wrap it into a single function */
export default async function callGPT(
	history,
	students,
	scenario,
	addendum = "",
	onResponse
) {
	const verNum = Constants.GPT_VERSION;
	if (verNum === 3) {
		callGPT3(history, students, scenario, onResponse);
	} else if (verNum === 3.5) {
		callNewGPT(
			"gpt-3.5-turbo",
			history,
			students,
			scenario,
			addendum,
			onResponse
		);
	} else {
		// Default to 4
		callNewGPT("gpt-4", history, students, scenario, addendum, onResponse);
	}
}

async function callGPT3(history, students, scenario, addendum, onResponse) {
	const myPrompt =
		makeProsePrompt(students, scenario, addendum) +
		makeHTMLTags(students) +
		"\n\n" +
		history.toString();
	console.log("Calling GPT-3... \n\n" + myPrompt);

	await openai
		.createCompletion({
			model: "text-davinci-003",
			prompt: myPrompt,
			temperature: 0.7,
			max_tokens: 256,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
			// TODO: use the user-specified name
			stop: ["TA: "],
		})
		.then((response) => {
			if (response.data.choices[0].text) {
				// TODO: handle if response is in wrong format
				onResponse(convertResponseToMessages(response.data.choices[0].text, null, students));
			} else {
				console.log("didn't get a response....");
				onResponse(new ChatMessage("", "... I don't understand?"));
			}
		});
}

/** GPT 3.5 and 4 use the same API, just a different model name */
async function callNewGPT(
	model,
	history,
	students,
	scenario,
	addendum,
	onResponse
) {
	const myPrompt = [
		{
			// TODO: move the code instructions somewhere else
			content: makeProsePrompt(students, scenario, addendum),
			role: "system",
		},
		...history.toGPTformat(),
	];

	console.log(
		`Calling ${model}... \n\n` +
			myPrompt
				.map((m) => {
					return `${m.name}: ${m.content}`;
				})
				.join("\n")
	);

	try {
		await openai
			.createChatCompletion({
				model: model,
				messages: myPrompt,
				stop: ["TA:"],
			})
			.then((response) => {
				const msg = response.data.choices[0].message.content;
				if (!Constants.IS_PRODUCTION) {
					console.log(`GPT Response: \n${msg}`);
				}

				// Parse out any code
				if (msg.includes("<CODE_EDITOR>")) {
					const {messages, codePieces} = parseCodeVersion(msg, students);
					onResponse(messages, codePieces);
				} else {
					onResponse(convertResponseToMessages(msg), null, students);
					console.log("hi what's up with this boyo?")
				}
			});
	} catch (err) {
		console.log(`Error from GPT: ${err}`);
		return
	}
}

//* ########################### Helper Functions ########################## */

/** Convert GPT's prose to Message object(s) */
function convertResponseToMessages(gptResponse, fromCode, students) {
	let newMessages = [];

	if(!gptResponse){
		console.log("hi i'm where i should be")
		if(fromCode){
			console.log("are we here?", students[0]['name'])
			newMessages.push(new ChatMessage(students[0]['name'], "sure!", "assistant"))
			return newMessages;
		}
		return null;
	}

	// Regex using colons and EOM
	for (const message of gptResponse.matchAll(/<(\w*)>(.*)<\/(\w*)>/gm)) {
		console.log(message)
		const agent = toTitleCase(message[1]);
		console.log(agent)
		const content = message[2];
		console.log("here's the message content ", content)
		// Note that the timestamp of the message is creation time -- not when user sees the message
		newMessages.push(new ChatMessage(agent, content, "assistant"));
	}

	return newMessages;
}

/** Turn the information into a paragraph */
function makeProsePrompt(students, scenario, addendum) {
	let retStr = Constants.GPT_SET_SCENE;

	retStr += scenario["text"] + "\n";

	Object.keys(students).forEach((student) => {
		retStr += "\n" + students[student].description;
	});

	retStr +=
		"\n\n" + Constants.GPT_RESPONSE_INSTRUCTIONS + "\n" + addendum + "\n\n";

	return retStr;
}

/** Create the HTML-esque tags that recap the conversation for GPT 3 */
function makeHTMLTags(students) {
	let retStr = `<span context="intro-cs-class-python"`;

	Object.keys(students).forEach((student) => {
		retStr += ` action="${student}-goes-to-office-hours"`;
	});

	Object.keys(students).forEach((student) => {
		let tmp = "";
		students[student].keywords.forEach((keyword) => {
			tmp += keyword + "-";
		});
		retStr += ` personality="${student}-${tmp.slice(0, -1)}"`;
	});

	return retStr + ">";
}

/** Separate code and chat */
function parseCodeVersion(gptResponse, students) {
	// See https://regex101.com/r/YYx6pP/4
	let matches = gptResponse.match(/<CODE_EDITOR>([^<]*)<\/CODE_EDITOR>/gm);
	let codePieces = [];
	let fromCode = "yes"

	matches.forEach((match) => {
		// Pull out the code
		codePieces.push(
			match.replace("<CODE_EDITOR>", "").replace("</CODE_EDITOR>", "").trim()
		);
		// Remove the match from the gptResponse, so it is as if it was the plain chat version
		gptResponse = gptResponse.replace(match, "");
	});

	let messages = convertResponseToMessages(gptResponse, fromCode, students);

	return { messages, codePieces };
}
