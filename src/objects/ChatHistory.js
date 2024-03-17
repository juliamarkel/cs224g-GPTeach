import React, { createContext, useState } from "react";
//import { doc, setDoc } from "firebase/firestore";
//import { DATABASE } from "../utils/database_setup.js";
//import { Constants } from "../config/constants";
//import { GPTeachContext } from "./GPTeach.js";

export const HistoryContext = createContext();

export function HistoryProvider({ children }) {
//	const GPTeachData = useContext(GPTeachContext);
	const [messages, setMessages] = useState([]);
	const [scenarioNum, setScenarioNum] = useState(0);

	let history = { messages };

	/** add a single message object to the array */
	history.addMessage = (msg) => {
		setMessages((prevArray) => [...prevArray, msg]);
		//writeToFirebase(msg, GPTeachData.UID, scenarioNum);
	};

	/** add multiple message objects to the array */
	history.addMessages = (messages, delayThem = false) => {
		return new Promise((resolve) => {
			if (delayThem) {
				let completedTimeouts = 0;
				// Add each message after a delay
				messages.forEach((msg, i) => {
					setTimeout(() => {
						history.addMessage(msg);
						completedTimeouts++;

						// If we've added all the messages, we're done
						if (completedTimeouts === messages.length) {
							resolve();
						}
						// Time to receive the message depends on length and index
					}, msg.text.length * Math.random() * 100 + i * 200);
				});
			} else {
				// By default, just add the messages
				messages.forEach((msg) => {
					history.addMessage(msg);
				});
				resolve();
			}
		});
	};

	history.undoMessage = () => {
		return;
	};

	history.getMessages = () => {
		return messages;
	};

	history.getLength = () => {
		return messages.length;
	};

	history.toString = () => {
		return messages.join("\n");
	};

	history.toGPTformat = () => {
		let retArr = [];
		for (const message of messages) {
			retArr.push(message.toGPTformat());
		}
		return retArr;
	};

	history.resetHistory = (num) => {
		setMessages([]);
		setScenarioNum(num);
	};

	return (
		<HistoryContext.Provider value={history}>
			{children}
		</HistoryContext.Provider>
	);
}

// function writeToFirebase(msg, uid, scenarioNum) {
// 	// Don't write to Firebase during testing
// 	if (!Constants.IS_PRODUCTION) {
// 		return;
// 	}

// 	const thisDoc = doc(
// 		DATABASE,
// 		Constants.FIREBASE_TOP_LEVEL_COLLECTION,
// 		uid.toString(),
// 		`scenario-${scenarioNum.toString().padStart(2, "0")}`,
// 		// This is time written to Firebase, not time of message creation; ideally, no collisions
// 		new Date().valueOf().toString()
// 	);

// 	setDoc(thisDoc, {
// 		role: msg.role,
// 		content: msg.text,
// 		name: msg.agent,
// 		timestamp: msg.timestamp,
// 		prettyDate: msg.dateObject.toLocaleString("en-US", {
// 			timeZone: "America/Los_Angeles",
// 			weekday: "short",
// 			year: "numeric",
// 			month: "numeric",
// 			day: "numeric",
// 			hour: "numeric",
// 			minute: "numeric",
// 			second: "numeric",
// 		}),
// 	});
// }
