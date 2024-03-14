import React from "react";

export default function Navbar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-primary">
			<div className="container">
				<a className="navbar-brand text-light" href="/home">
					GPTeach
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<a className="nav-link text-light" href="/">
								Home
							</a>
						</li>

						<li className="nav-item">
							<a className="nav-link text-light" href="/sign-up">
								Sign Up
							</a>
						</li>

						<li className="nav-item">
							<a className="nav-link text-light" href="/user-info">
								User Info
							</a>
						</li>

						<li className="nav-item">
							<button
								className="btn btn-outline-light"
								onClick={() => {
									localStorage.clear();
									window.location.href = "/sign-up";
								}}
							>
								Sign Out
							</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
