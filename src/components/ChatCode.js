import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/python";

export const ChatCode = props => {
	return (
		<AceEditor
			mode="python"
			value={props.content}
			onChange={e => props.update(e)}
			width="100%"
			fontSize="15px"
			enableBasicAutocompletion={true}
			enableLiveAutocompletion={true}
			enableSnippets={true}
			readOnly={false}
			wrapEnabled={true}
			maxLines={Infinity}
			style={{ width: "100%", flexGrow: 2, border: "1px solid #ddd" }}
		/>
	);
};
