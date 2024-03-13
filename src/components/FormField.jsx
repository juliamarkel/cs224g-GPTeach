import React, { useState } from "react";

export default function FormField({
	initialValue = "",
	label,
	placeholder,
	setErrors,
}) {
	const [inputText, setInputText] = useState(initialValue);
	const [textIsValid, setTextIsValid] = useState(true);
	// Lowercase and remove any special characters
	const labelID = label.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");

	const handleTextChange = (value) => {
		setInputText(value);

		if (value) {
			setTextIsValid(true);
			setErrors((prev) => {
				console.log(prev);
				if (labelID in prev) {
					delete prev[labelID];
					return prev;
				} else {
					return prev;
				}
			});
		} else {
			setTextIsValid(false);
			setErrors((prev) => {
				prev[labelID] = `Please fill in the "${labelID}" field.`;
				return prev;
			});
		}
	};

	return (
		<div className={`form-group ${textIsValid ? "" : "has-error"}`}>
			<label htmlFor={`form-field-${labelID}`} className="mt-2">
				{label}
			</label>

			<input
				id={`form-field-${labelID}`}
				className={`form-control ${textIsValid ? "" : "is-invalid"}`}
				value={inputText}
				onChange={(e) => handleTextChange(e.target.value)}
				placeholder={placeholder}
			/>
		</div>
	);
}
