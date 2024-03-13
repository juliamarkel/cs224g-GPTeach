import React, { useEffect, useRef, useState, useContext } from "react";
import { FaPaperPlane, FaUndo } from "react-icons/fa"; // eslint-disable-line no-unused-vars
import ChatMessage from "../objects/ChatMessage";
import { GPTeachContext } from "../objects/GPTeach";
import RecordingButton from "./RecordingButton";

export const InputField = ({ disabled, onSend, undoMessage, onKeystroke }) => {
	const GPTeachData = useContext(GPTeachContext);
	const [myMsg, setMyMsg] = useState("");
	const [textareaHeight, setTextareaHeight] = useState("auto");

	const inputRef = useRef(null);

	// submit TA message
	const handleSubmit = (event) => {
		event.preventDefault();
		onSend(new ChatMessage(GPTeachData.TAname, myMsg, "user"));
		setMyMsg("");
		inputRef.current.focus();
	};

	// When msg is updated, focus the text box
	useEffect(() => {
		if (!disabled) {
			inputRef.current.focus();
		}
	}, [disabled, myMsg]);

	const handleKeypress = (event) => {
		setMyMsg(event.target.value);

		// Return key = submit form
		if (event.nativeEvent.inputType === "insertLineBreak") {
			handleSubmit(event);
			setTextareaHeight("auto");
		} else {
			// Resize the textarea based on what the user has typed
			setTextareaHeight(`${inputRef.current.scrollHeight}px`);

			// If the user deletes all the text, reset the textarea height
			if (event.target.value === "") {
				setTextareaHeight("auto");
			}
		}

		onKeystroke();
	};

	return (
		<>
			<div className="d-flex">
				<form
					id="msg-form"
					style={{ display: "flex", width: "100%" }}
					onSubmit={handleSubmit}
				>
					<div
						className="d-flex flex-column"
						style={{
							border: "1px",
							borderColor: "#ccc",
							borderStyle: "solid",
							borderRadius: "10px",
							padding: "5px",
							width: "100%",
						}}
					>
						<textarea
							disabled={disabled}
							value={myMsg}
							style={{
								flexGrow: "2",
								resize: "none",
								border: "none",
								outline: "none",
								height: textareaHeight,
								marginBottom: "2px",
							}}
							onChange={handleKeypress}
							autoFocus={true}
							ref={inputRef}
						/>

						<div className="d-flex justify-content-between align-items-flex-end">
							{/* <button
								title="Undo"
								className="btn btn-outline-secondary"
								disabled={disabled}
								onClick={undoMessage}
								value="Undo"
							>
								<FaUndo />
							</button> */}

							<RecordingButton onTranscribe={setMyMsg} />

							<button
								title="Send"
								className="btn btn-primary ml-auto"
								disabled={disabled}
								onClick={undoMessage}
								type="submit"
								value="Submit"
							>
								<FaPaperPlane />
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};
