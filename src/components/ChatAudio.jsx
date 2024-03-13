import React, { useState, useEffect } from "react";
import { Constants } from "../config/constants";
import { FaPlay, FaStop } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

export default function ChatAudio({ message, voice }) {
	const [audioUrl, setAudioUrl] = useState();
	const [isPlaying, setIsPlaying] = useState(false);
	const messageText = message.text;
	// Generate a unique ID for each (necessary for controls to work if multiple audio elements)
	const id = uuidv4();

	/** Constructor: generate audio when created */
	useEffect(() => {
		generateAudio();
	}, []);

	/** Generate the audio recording */
	async function generateAudio() {
		try {
			const response = await fetch("https://api.openai.com/v1/audio/speech", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${Constants.OPENAI_API_KEY}`,
					// opus: for internet streaming and communication, low latency
					// https://platform.openai.com/docs/guides/text-to-speech/supported-output-formats
					output: "opus",
				},
				body: JSON.stringify({
					model: "tts-1",
					input: messageText,
					// Options: https://platform.openai.com/docs/guides/text-to-speech/voice-options
					voice: voice,
				}),
			});

			if (!response.ok) {
				console.error("Error generating text-to-speech: response not OK");
			}

			const audioBlob = await response.blob();
			const audioUrl = URL.createObjectURL(audioBlob);
			setAudioUrl(audioUrl);
		} catch (error) {
			console.error("Error generating text-to-speech:", error);
		}
	}

	const handleTogglePlay = () => {
		const audioElement = document.getElementById(`chatAudio-${id}`);

		if (audioElement.paused) {
			audioElement.play();
			setIsPlaying(true);
		} else {
			audioElement.pause();
			// Reset playback position to beginning
			audioElement.currentTime = 0;
			setIsPlaying(false);
		}
	};

	/** Add event listener for when audio ends */
	useEffect(() => {
		const audioElement = document.getElementById(`chatAudio-${id}`);
		if (audioElement) {
			audioElement.addEventListener("ended", handleAudioEnded);
			return () => {
				audioElement.removeEventListener("ended", handleAudioEnded);
			};
		}
	}, [audioUrl, id]);

	const handleAudioEnded = () => {
		setIsPlaying(false);
	};

	if (!audioUrl) {
		return (
			<button
				// The "invisible" class keeps the button in the layout, but hides it
				className="btn btn-sm invisible"
			>
				{isPlaying ? <FaStop /> : <FaPlay />}
			</button>
		);
	}

	return (
		<>
			<button
				title="Student Message Audio"
				className="btn btn-sm"
				onClick={handleTogglePlay}
				value={isPlaying ? "stop" : "play"}
			>
				{isPlaying ? <FaStop /> : <FaPlay />}
			</button>
			<audio id={`chatAudio-${id}`} src={audioUrl} />
		</>
	);
}
