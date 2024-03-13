import React, { useContext } from "react";
import { GPTeachContext } from "../objects/GPTeach.js";
import ChatAudio from "./ChatAudio";

export default function ChatBubble({ message, children }) {
	const GPTeachData = useContext(GPTeachContext);

	let className = "chatBubble";
	const isOther = message.agent !== GPTeachData.TAname;

	if (isOther) {
		className += " chatBubbleOther";
	} else {
		className += " chatBubbleUser";
	}

	return (
		<div className="chatBubbleContainer">
			{isOther && (
				<div className="chatBubbleSenderLabel">
					{message.agent}{" "}
					{
						// <ChatAudio
						// 	message={message}
						// 	// Use the voice specified for the student, or default to "alloy"
						// 	voice={
						// 		GPTeachData.students.find(
						// 			(student) => student.name === message.agent
						// 		).voice || "alloy"
						// 	}
						// />
					}
				</div>
			)}

			<div className={className}>
				{message.text}
				<div>{children}</div>
			</div>
		</div>
	);
}
