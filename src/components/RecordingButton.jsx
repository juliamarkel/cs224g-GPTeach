import React, { useState, useEffect } from "react";
import { FaMicrophone, FaRegStopCircle } from "react-icons/fa";
import { Constants } from "../config/constants";

export default function RecordingButton({ onTranscribe }) {
	const [isRecording, setIsRecording] = useState(false);
	const [audioBlob, setAudioBlob] = useState(null);
	const [audioRecorder, setAudioRecorder] = useState(null);

	/** When the audioBlob is populated, add it as a response */
	useEffect(() => {
		if (audioBlob) {
			addVoiceResponse();
		}
	}, [audioBlob]);

	/** Start recording audio */
	function startRecording() {
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then((stream) => {
				const recorder = new MediaRecorder(stream);
				const chunks = [];

				recorder.ondataavailable = (e) => {
					if (e.data.size > 0) {
						chunks.push(e.data);
					}
				};

				recorder.onstop = () => {
					const blob = new Blob(chunks, { type: "audio/wav" });
					setAudioBlob(blob);
				};

				recorder.start();
				setAudioRecorder(recorder);
			})
			.catch((error) => console.error("Error accessing microphone:", error));
	}

	/** End the audio recording */
	function stopRecording() {
		if (audioRecorder && audioRecorder.state === "recording") {
			audioRecorder.stop();
		}
		setIsRecording(false);
	}

	/** Send audio to OpenAI transcription API */
	const transcribeAudioOpenAI = async (audioBlob) => {
		// API reference: https://platform.openai.com/docs/guides/speech-to-text?lang=curl
		try {
			// Create a FormData object and append the audio file and model
			const formData = new FormData();
			formData.append("file", new Blob([audioBlob], { type: "audio/wav" }));
			formData.append("model", "whisper-1");

			// Make the API request to OpenAI using fetch
			const response = await fetch(
				"https://api.openai.com/v1/audio/transcriptions",
				{
					method: "POST",
					body: formData,
					headers: {
						Authorization: `Bearer ${Constants.OPENAI_API_KEY}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error(
					`Failed to transcribe audio: ${response.status} ${response.statusText}`
				);
			}

			// Parse the response as JSON
			const responseData = await response.json();

			// Return the transcribed text
			return responseData.text;
		} catch (error) {
			console.error("Error transcribing audio:", error.message);
			return null;
		}
	};

	/** Send the transcribed text */
	const addVoiceResponse = async () => {
		if (audioBlob) {
			const transcription = await transcribeAudioOpenAI(audioBlob);

			if (transcription) {
				onTranscribe(transcription);
				setAudioBlob(null);
			} else {
				console.error("transcription failed");
			}
		} else {
			console.error("no audioBlob found");
		}
	};

	return (
		<button
			className="btn btn-secondary"
			disabled={audioBlob}
			title={"Record audio"}
			onClick={(event) => {
				// Prevent the RecordingButton from submitting the InputField form
				event.preventDefault();

				if (!isRecording) {
					startRecording();
					setIsRecording(true);
				} else {
					stopRecording();
				}
			}}
		>
			{isRecording ? <FaRegStopCircle /> : <FaMicrophone />}
		</button>
	);
}
