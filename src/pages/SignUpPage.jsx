import React, { useState } from "react";
import User from "../objects/User";

export default function SignUpPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	const handleSignUp = () => {
		// Create the user
		const user = new User(email, name, password);
		user.saveUser();
		// Then redirect to user info page
		window.location.href = "/user-info";
	};

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card mt-5">
						<div className="card-body">
							<h2 className="card-title">Create Account</h2>
							<form onSubmit={handleSignUp}>
								<div className="form-group">
									<label>Email:</label>
									<input
										type="text"
										className="form-control"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label>Password:</label>
									<input
										type="password"
										className="form-control"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label>Display Name:</label>
									<input
										type="name"
										className="form-control"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>

								<button
									type="button"
									className="btn btn-primary"
									onClick={handleSignUp}
								>
									Create Account
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
