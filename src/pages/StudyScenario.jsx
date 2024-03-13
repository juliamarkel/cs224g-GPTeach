import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Constants } from "../config/constants";
import callGPT from "../utils/gpt.js";
import { Messages } from "../components/Messages";
import { ContextView } from "../components/ContextView";
import { HistoryContext } from "../objects/ChatHistory";
import { GPTeachContext } from "../objects/GPTeach";
import "../style/ChatOnly.css";
import "../style/ProgressDots.css";

export const StudyScenario = () => {
	const history = useContext(HistoryContext);
	const GPTeachData = useContext(GPTeachContext);
	const [isQuerying, setIsQuerying] = useState(false);

	const { num } = useParams();
	const scenarioNum = parseInt(num);
	// scenarioNum is 1-indexed!
	const scenario = GPTeachData.scenarios[scenarioNum - 1];
	const [students, setStudents] = useState(null);

	// Log all the data to Firebase on first page load (only on first scenario)
	useEffect(() => {
		GPTeachData.createFirebaseDocument();
	}, []);

	// If the scenarioNum has changed, reset the history for the new scenario
	useEffect(() => {
		history.resetHistory(scenarioNum);
		setStudents(getStudents);
	}, [scenarioNum]);

	/** Add the TA's message and wait for a response */
	function addWrittenResponse(TAmessage) {
		history.addMessage(TAmessage);
		setIsQuerying(true);
	}

	/** If we are now waiting for a response, call GPT */
	useEffect(() => {
		if (isQuerying) {
			callGPT(history, students, scenario, gptMessages => {
				if (gptMessages[0]) {
					history.addMessages(gptMessages, Constants.IS_PRODUCTION).then(() => {
						setIsQuerying(false);
					});
				} else {
					// GPT didn't respond
					setIsQuerying(false);
					console.log("well shoot");
				}
			});
		}
	}, [isQuerying]);

	/** Interface work: create the circles */
	function makeProgressDots() {
		// Create the circles for the progress bar
		let progressDots = [];
		for (let i = 1; i <= Constants.NUM_SCENARIOS; i++) {
			if (i < scenarioNum) {
				progressDots.push(
					<div className={"progressDot doneDot"} key={i}>
						<span role="img" aria-label="check">
							✔
						</span>
					</div>
				);
			} else if (i === scenarioNum) {
				progressDots.push(
					<div className={"progressDot inProgressDot"} key={i}>
						{i}
					</div>
				);
			} else {
				progressDots.push(
					<div className={"progressDot"} key={i}>
						{i}
					</div>
				);
			}
		}
		return progressDots;
	}

	/** Get students based on the scenario number and the TA's name */
	function getStudents() {
		let students = [];
		let i = (scenarioNum - 1) * Constants.NUM_STUDENTS;

		while (students.length !== Constants.NUM_STUDENTS) {
			let student = GPTeachData.students[i];
			let shouldAddStudent = true;
			// Check student doesn't have the same name as the TA
			if (student.name === GPTeachData.TAname) {
				shouldAddStudent = false;
			}
			// Check student not already in the pool
			else if (students.map(s => s.name).includes(student.name)) {
				shouldAddStudent = false;
			}

			if (shouldAddStudent) {
				students.push(student);
			}

			i++;
			if (i >= GPTeachData.students.length) {
				i = 0;
			}
		}
		return students;
	}

	if (!students) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className="d-flex flex-row row chatOnly" id="everythingWrapper">
			<ContextView scenario={scenario}>
				<div>
					<p>
						When you feel that you have helped the students and achieved the
						learning goals, move on to the next session.
					</p>

					<Link
						to={
							scenarioNum >= Constants.NUM_SCENARIOS
								? `/sequence/postTest`
								: `/sequence/${scenarioNum + 1}`
						}
					>
						<button
							className="btn btn-outline-success"
							disabled={
								Constants.IS_PRODUCTION &&
								(isQuerying || history.getLength() === 0)
							}
						>
							{scenarioNum >= Constants.NUM_SCENARIOS
								? "Completion Survey"
								: "Next Session"}
						</button>
					</Link>
				</div>

				{/* Progress Dots */}
				<div>
					<h2 className="text-center">Progress</h2>
					<div
						className="d-flex flex-row"
						style={{ justifyContent: "space-around", margin: "20px" }}
					>
						{makeProgressDots().map(dot => {
							return dot;
						})}
					</div>
				</div>
			</ContextView>

			<div
				className="d-flex flex-column chatConvoWrapper col-4"
				style={{
					overflow: "auto",
					flexGrow: 1,
				}}
			>
				<h1
					style={{
						paddingTop: "15px",
						textAlign: "center",
					}}
				>
					<span role="img" aria-label="chat bubble">
						💬
					</span>{" "}
					Online Office Hours
				</h1>

				<h2
					style={{
						textAlign: "center",
						fontSize: "18px",
						color: "grey",
						fontStyle: "italic",
						margin: "0px",
						padding: "0px",
					}}
				>
					<span style={{ fontWeight: "bold" }}>{Constants.NUM_STUDENTS}</span>{" "}
					student(s) present: {students.map(student => student.name).join(", ")}
				</h2>

				<Messages
					isWaitingOnStudent={isQuerying}
					onMessageSend={addWrittenResponse}
				/>
			</div>
		</div>
	);
};
