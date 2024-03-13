import React from "react";
import { Router } from "./Router";
import "bootstrap/dist/css/bootstrap.min.css";
import { GPTeachProvider } from "./objects/GPTeach";
import { HistoryProvider } from "./objects/ChatHistory";
import Navbar from "./components/NavBar";
import { CodeProvider } from "./objects/CodeHistory";

export default function App() {
	return (
		<div className="app">
			<GPTeachProvider>
				<HistoryProvider>
					<CodeProvider>
					<Navbar />
					<Router />
					</CodeProvider>
				</HistoryProvider>
			</GPTeachProvider>
		</div>
	);
}
