import React from "react";
import User from "../objects/User";

export default function UserInfoPage(props) {
	// TODO: we should get user at a higher level page and pass it down as a prop
	const user = User.getUser();

	if (!user) {
		console.log("not signed in");
		window.location.href = "/sign-up";
		return;
	}

	// TODO: this page should look different if they are an admin
	return (
		<div className="UserInfoPage container">
			<h1 className="display-4">User Information</h1>

			<h2 className="mt-4">About You</h2>
			<label htmlFor="name">Display Name:</label>
			<input
				type="text"
				id="name"
				className="form-control"
				defaultValue={user.name}
			/>
			<p className="text-muted">Hey, {user.name}, nice to meet you!</p>

			<p>this button doesn't actually do anything (yet)</p>
			{/* TODO: make functional */}
			<button className="btn btn-success mt-1">Save Changes</button>

			<h2 className="mt-4">Your Organizations</h2>
			<ul className="list-group">
				{/* TODO: see info for the org's admin(s) */}
				{user.orgIDs.map((org) => (
					<li className="list-group-item" key={org}>
						{org}
					</li>
				))}
			</ul>

			<label htmlFor="addOrg" className="mt-4">
				Add Organization:
			</label>
			<div className="input-group">
				<input
					type="text"
					id="addOrg"
					className="form-control"
					placeholder="organization ID"
				/>
				<div className="input-group-append">
					<button className="btn btn-primary" type="button">
						Add
					</button>
				</div>
			</div>
		</div>
	);
}
