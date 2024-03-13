export default class ChatMessage {
	constructor(agent, text, role) {
		// Student name or TA
		this.agent = agent;
		this.name = agent;
		// Required by GPT 3.5 and 4
		this.role = role;
		// Get rid of any newlines
		this.text = text.replace(/[\n]/gm, "");
		// Creation date
		this.dateObject = new Date();
		// Now, as epoch time (in ms)
		this.timestamp = this.dateObject.valueOf();
	}

	toString() {
		return `${this.agent}: ${this.text}`;
	}

	toGPTformat() {
		return {
			role: this.role,
			content: this.text,
			name: this.agent,
		};
	}
}
