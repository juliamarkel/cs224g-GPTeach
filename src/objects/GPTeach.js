import React, { createContext, useState, useEffect } from "react";
//import { doc, setDoc } from "firebase/firestore";
//import { ClientJS } from "clientjs";
//import { DATABASE } from "../utils/database_setup.js";
import { Constants } from "../config/constants";
import { objectToArray, shuffleArray } from "../utils/primitiveManipulation.js";

const filesToImport = [
	Constants.STUDENT_FILE,
	Constants.LEARNING_GOAL_FILE,
	Constants.SCENARIO_FILE,
];

export const GPTeachContext = createContext();

export function GPTeachProvider({ children }) {
	const [students, setStudents] = useState(null);
	const [learningGoals, setLearningGoals] = useState(null);
	const [scenarios, setScenarios] = useState(null);
	const [uid, setUid] = useState();
	const [TAname, setTAname] = useState(Constants.DEFAULT_TA_NAME);

	// This is the "constructor" -- runs once and sets everything up
	useEffect(() => {
		// Read in the config files
		Promise.all(
			filesToImport.map(path =>
				import(`../config/${path}`).then(module => module.default)
			)
		)
			.then(modules => {
				// Parse the config files and add to state
				parseImportedConfigs(modules);

				const uid = makeUID();
				setUid(uid);
			})
			.catch(error => {
				// Handle any errors that occur during the dynamic imports
				console.error("Error importing variables:", error);
			});
	}, []);

	function parseImportedConfigs(modules) {
		const [studentsModule, learningGoalsModule, scenariosModule] = modules;

		// Assign state values based on values in file
		if (studentsModule) {
			setStudents(
				shuffleArray(
					objectToArray(
						Object.entries(studentsModule.students).reduce(
							(acc, [key, value]) => {
								acc[key] = value;
								return acc;
							},
							{}
						)
					)
				)
			);
		}

		if (learningGoalsModule) {
			setLearningGoals(learningGoalsModule.learningGoals);
		}

		if (scenariosModule) {
			setScenarios(scenariosModule.scenarios);
		}
	}

	function makeUID() {
		// UID is integer based on current time -- alpha order is reverse chronological
		return Number.MAX_SAFE_INTEGER - new Date().valueOf();
	}

	/** Record all information in Firebase */
	// function createFirebaseDocument() {
	// 	// Create the document in Firebase
	// 	const thisDoc = doc(
	// 		DATABASE,
	// 		Constants.FIREBASE_TOP_LEVEL_COLLECTION,
	// 		uid.toString()
	// 	);

		//const client = new ClientJS();

		// Add properties to Firebase document
	// 	setDoc(
	// 		thisDoc,
	// 		{
	// 			date: new Date().toLocaleString("en-US", {
	// 				timeZone: "America/Los_Angeles",
	// 				weekday: "short",
	// 				year: "numeric",
	// 				month: "numeric",
	// 				day: "numeric",
	// 				hour: "numeric",
	// 				minute: "numeric",
	// 				second: "numeric",
	// 			}),
	// 			GPTeachConfiguration: {
	// 				GPTversion: Constants.GPT_VERSION,
	// 				prompt_setScene: Constants.GPT_SET_SCENE,
	// 				prompt_responseInstructions: Constants.GPT_RESPONSE_INSTRUCTIONS,
	// 				file_students: Constants.STUDENT_FILE,
	// 				file_learningGoals: Constants.LEARNING_GOAL_FILE,
	// 				file_scenario: Constants.SCENARIO_FILE,
	// 				isProd: Constants.IS_PRODUCTION,
	// 			},
	// 			userData: {
	// 				userAgent: navigator.userAgent,
	// 				browserLanguage: navigator.language || navigator.userLanguage,
	// 				// More likely to be not-unique, but hard to change
	// 				customFingerprint: createCustomFingerprint(client),
	// 				// More specific, but easier to change
	// 				defaultFingerprint: client.getFingerprint(),
	// 			},
	// 		},
	// 		{ merge: true }
	// 	);
	// }

	/** Generates a number based on hard-to-change information about the user's computer to attempt to identify them */
	// function createCustomFingerprint(client) {
	// 	return client.getCustomFingerprint(
	// 		client.getOSVersion(),
	// 		client.getDeviceType(),
	// 		client.getCPU(),
	// 		client.getFonts()
	// 	);
	// }

	if (uid && students && learningGoals && scenarios) {
		// createFirebaseDocument();

		return (
			<GPTeachContext.Provider
				value={{
					students: students,
					learningGoals,
					scenarios,
					UID: uid,
					TAname,
					setTAname,
					//createFirebaseDocument,
				}}
			>
				{children}
			</GPTeachContext.Provider>
		);
	} else {
		return <h1>Loading...</h1>;
	}
}
