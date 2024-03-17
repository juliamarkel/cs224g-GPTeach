import React, { createContext, useState } from "react";

export const CodeContext = createContext();

export function CodeProvider({ children }) {
	const [codePieces, setCodePieces] = useState([]);

	let codeHistory = [ ];

	/** add a single message object to the array */
	codeHistory.addCode = (cp) => {
		setCodePieces((prevArray) => [...prevArray, cp]);
	};

	/** add multiple message objects to the array */
	codeHistory.addCodes = (codePieces) => {
		return new Promise((resolve) => {
				// By default, just add the messages
				codePieces.forEach((cp) => {
					codeHistory.addCode(cp);
				});
				resolve();
			}
		);
	};

	codeHistory.getCode = () => {
		return codePieces;
	};

	codeHistory.getLength = () => {
		return codePieces.length;
	};

	codeHistory.toString = () => {
		return codePieces.join("\n");
	};

	// codeHistory.toGPTformat = () => {
	// 	let retArr = [];
	// 	for (const codePiece of codePieces) {
	// 		retArr.push(codePieces.toGPTformat());
	// 	}
	// 	return retArr;
	// };

	codeHistory.resetHistory = () => {
		setCodePieces([]);
	};

	return (
		<CodeContext.Provider value={codeHistory}>
			{children}
		</CodeContext.Provider>
	);
}

