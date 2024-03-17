import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Constants } from "../config/constants";
import callGPT from "../utils/gpt.js";
import { ChatCode } from "../components/ChatCode";
import { Messages } from "../components/Messages";
import { ContextView } from "../components/ContextView";
import { HistoryContext } from "../objects/ChatHistory";
import { CodeContext } from "../objects/CodeHistory";
import { GPTeachContext } from "../objects/GPTeach";
import { shuffleArray } from "../utils/primitiveManipulation";
import "../style/ChatOnly.css";

export const ChatWithCode = () => {
	const history = useContext(HistoryContext);
	const codeHistory = useContext(CodeContext);
	const GPTeachData = useContext(GPTeachContext);
	const [isQuerying, setIsQuerying] = useState(false);
	const [editorContent, setEditorContent] = useState("");
	const students = GPTeachData.students.slice(0, Constants.NUM_STUDENTS);
	const scenario = shuffleArray(GPTeachData.scenarios)[0];

	/** Add the TA's message and wait for a response */
	function addWrittenResponse(TAmessage) {
		history.addMessage(TAmessage);
		setIsQuerying(true);
	}


	/** If we are now waiting for a response, call GPT */
	useEffect(() => {
		if (isQuerying) {
			callGPT(
				history,
				students,
				scenario,
				Constants.GPT_CODE_ADDENDUM + "\nStudent code goes here, wrapped in <CODE_EDITOR> </CODE_EDITOR>: \n" + codeHistory,
				(gptMessages, codePieces) => {
					// Add the messages from GPT
					if (codePieces) {
						setEditorContent(codePieces.join("\n\n"));
						setIsQuerying(false)
						codeHistory.addCodes(codePieces)
					}
					if (gptMessages[0]) {
						history
							.addMessages(gptMessages, Constants.IS_PRODUCTION)
							.then(() => {
								setIsQuerying(false);
							});
					} else {
						// Something has gone wrong!!!! (TODO: handle this)
						setIsQuerying(false);
						console.log("well shoot");
					}
				}
			);
		}
	}, [isQuerying]);

	return (
		<div className="d-flex flex-row row" id="everythingWrapper">
			<ContextView scenario={scenario}>
				<Link to={"#"}>
					<button className="btn btn-outline-success" disabled={isQuerying}>
						New Session
					</button>
				</Link>
			</ContextView>

			<div className="codeEditorWrapper col-4">
				<h2>Editor</h2>
				<ChatCode content={editorContent} update={setEditorContent} />
			</div>

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
					student(s) present:{" "}
					{students.map((student) => student.name).join(", ")}
				</h2>

				<Messages
					isWaitingOnStudent={isQuerying}
					onMessageSend={addWrittenResponse}
				/>
			</div>
		</div>
	);
};
