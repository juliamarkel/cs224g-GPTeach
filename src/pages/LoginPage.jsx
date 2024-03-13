import React, { useState } from "react";

export default function LoginPage({ props }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		// You can handle authentication here (e.g., sending a request to your server)
		console.log("Logging in with:", email, password);
		// Fetch the user info
		// Then redirect to home page
	};

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card mt-5">
						<div className="card-body">
							<h2 className="card-title">Login</h2>

							<p>this page doesn't actually do anything right now!</p>

							<form onSubmit={handleLogin}>
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
								<button
									type="button"
									className="btn btn-primary"
									onClick={handleLogin}
								>
									Login
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
