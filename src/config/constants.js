export const Constants = {
	NUM_STUDENTS: 2,
	// Either 3, 3.5, or 4
	GPT_VERSION: 4,
	GPT_SET_SCENE:
		"The user is a TA, and you are playing students going to office hours with questions or problems.",
	GPT_RESPONSE_INSTRUCTIONS:
		"The students are discreet and subtle about their personalities, but still act in character. The students interact to try to help each other, though sometimes are wrong.  Begin the student messages with <student name>. End them with </student name>. For example: <steven> Hi how's it going? </steven>",
	// In the code version, this is in addition to the prompt that is always shown
	GPT_CODE_ADDENDUM:
		"The students and TA have a single shared code editor. The contents are shown in <CODE_EDITOR></CODE_EDITOR> tags. They will send only code within the code editor, no additional dialogue inside. Please maintain the contents of the code editor, and only make modifications based on TA requests. When students show their code, they also always send a message outside of the code editor. Always respond with either <CODE_EDITOR> or <student name>. Be sure to ALWAYS respond with <student name> tags wrapping text.",

	// Enables some shortcuts for easier development
	IS_PRODUCTION: false,

	// These paths are relative to /src/config, and omit the .js extension
	STUDENT_FILE: "students/personas",
	LEARNING_GOAL_FILE: "learning_goals/example",
	SCENARIO_FILE: "scenarios/code_scenarios",

	// Number of scenarios in the sequence
	NUM_SCENARIOS: 3,
	DEFAULT_TA_NAME: "TA",

	FIREBASE_TOP_LEVEL_COLLECTION: "GPTeach-v2",
	OPENAI_API_KEY: process.env.REACT_APP_OPENAI_API_KEY,
};

// TODO: some of these should be env vars, and some should be user-changeable
