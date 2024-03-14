import React from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Chat } from "./pages/Chat";
import { ChatWithCode } from "./pages/ChatWithCode";
import { LandingPage } from "./pages/LandingPage";
import { StudySplashPage } from "./pages/StudySplashPage";
import { StudyScenario } from "./pages/StudyScenario";
import StudyGoogleForm from "./pages/StudyGoogleForm";
import ConfigPage from "./pages/Config";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UserInfoPage from "./pages/UserInfoPage";

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/chat" element={<Chat />} />
				<Route path="/code" element={<ChatWithCode />} />

				<Route path="/sequence/" element={<StudySplashPage />} />
				<Route path="/sequence/postTest" element={<StudyGoogleForm />} />
				<Route path="/sequence/:num" element={<StudyScenario />} />

				<Route path="/config/" element={<ConfigPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/sign-up" element={<SignUpPage />} />
				<Route path="/user-info" element={<UserInfoPage />} />

				{/* If you add or change any routes, remember to update the Landing Page! */}
				<Route path="/home" element={<LandingPage />} />
				<Route path="/" element={<ChatWithCode />} />

			</Routes>
		</BrowserRouter>
	);
};
