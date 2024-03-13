import React, { useEffect, useContext } from "react";
import { HistoryContext } from "../objects/ChatHistory";
import { InputField } from "./InputField.js";
import ChatBubble from "./ChatBubble";
import "../style/Messages.css";

export const Messages = ({ isWaitingOnStudent, onMessageSend }) => {
	const messagesWrapperRef = React.createRef();
	const history = useContext(HistoryContext);

	useEffect(resizeChatWrapper, []);
	useEffect(scrollToBottom, [isWaitingOnStudent]);

	/** Set max-height of the conversation to the remaining space between the textInput and the header, so it scrolls independently from the page */
	function resizeChatWrapper() {
		const parentContainer = messagesWrapperRef.current.parentNode;
		const divAboveHeight = parentContainer.firstChild.offsetHeight;
		const divBelowHeight = parentContainer.lastChild.offsetHeight;
		const remainingSpace =
			parentContainer.offsetHeight - divAboveHeight - divBelowHeight;
		messagesWrapperRef.current.style.maxHeight = `${remainingSpace}px`;
	}

	function scrollToBottom() {
		const scrollContainer = messagesWrapperRef.current;
		scrollContainer.scrollTo({
			top: scrollContainer.scrollHeight,
			behavior: "smooth",
		});
	}

	/** as we type, we may need to resize things */
	function onKeystroke() {
		resizeChatWrapper();
		scrollToBottom();
	}

	return (
		<>
			<div
				className="d-flex flex-column messagesWrapper col"
				ref={messagesWrapperRef}
				style={{ maxHeight: "60vh" }}
			>
				{history.getMessages().map((msg, i) => (
					<ChatBubble key={i} message={msg} />
				))}

				{isWaitingOnStudent && (
					<div className="chatBubbleContainer">
						<div
							className="chatBubble chatBubbleOther"
							style={{ maxWidth: "10vw", textAlign: "center" }}
						>
							{/* Source: https://tenor.com/view/discord-loading-dots-discord-loading-loading-dots-gif-23479300 */}
							<img
								src="https://media.tenor.com/NqKNFHSmbssAAAAi/discord-loading-dots-discord-loading.gif"
								style={{ width: "20%" }}
								alt="waiting for response..."
							/>
						</div>
					</div>
				)}
			</div>

			<InputField
				onSend={onMessageSend}
				undoMessage={history.undoMessage()}
				disabled={isWaitingOnStudent}
				onKeystroke={onKeystroke}
			/>
		</>
	);
};
