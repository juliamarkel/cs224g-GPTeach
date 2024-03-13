import React from "react";
import { Link } from "react-router-dom";
import User from "../objects/User";

export const LandingPage = () => {
	return (
		<div className="container">
			<h1 className="mt-4">GPTeach!!!</h1>

			<p>
				{User.isLoggedIn()
					? `Hi, ${User.getUser().name}!`
					: `you are logged out`}
			</p>

			<ul className="list-group list-group-flush">
				<LandingPageItem link="/chat" title="Plain Chat" />
				<LandingPageItem link="/code" title="Chat with Code" />
				<LandingPageItem link="/sequence" title="Study Sequence" />
				<LandingPageItem link="/config" title="Configuration Generator" />
				<LandingPageItem link="/login" title="Log In" />
				<LandingPageItem link="/sign-up" title="Sign Up" />
				<LandingPageItem link="/user-info" title="User Info" />
			</ul>
		</div>
	);
};

function LandingPageItem(props) {
	return (
		<li className="list-group-item">
			{props.title}: <Link to={props.link}>{props.link}</Link>
		</li>
	);
}
