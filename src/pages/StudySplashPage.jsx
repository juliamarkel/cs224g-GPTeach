import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GPTeachContext } from "../objects/GPTeach";
import { toTitleCase } from "../utils/primitiveManipulation";

export const StudySplashPage = () => {
	const GPTeachData = useContext(GPTeachContext);

	function handleNameChange(event) {
		GPTeachData.setTAname(toTitleCase(event.target.value));
	}

	if (!GPTeachData) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className="container">
			{/* TODO (Julia) */}
			<div className="d-flex flex-column">
				<div className="textPage">
					<h1 style={{textAlign:"center", margin:"50px"}}>Welcome to our Teacher Training Study!</h1>
					<p style={{fontSize:"18pt"}}>Your task is to go through this interactive TA training tool, responding to the best of your abilities. This isn’t a test but rather a chance for you to get practice teaching. <b>You will go through three teaching sessions, with two students in each, where you will assume the role of a TA in office hours. Your job is to interact with the students + make notice of the learning goals.</b> Once you feel you’ve reached the end of a session, you may move on to the next.  Please note: you may not go back to any previous ones. </p>
					<p style={{fontSize:"16pt"}}><i> By pressing begin and moving onto the study you are consenting to having your anonymous interaction transcript recorded for confidential research purposes. </i></p>
					</div>
			</div>

			<div className="container mt-4">
				<div className="row">
					<div>
						<div className="form-group">
							<label htmlFor="nameInput">
								What should the students call you?
							</label>
							<input
								type="text"
								id="nameInput"
								className="form-control"
								value={GPTeachData.TAname}
								onChange={handleNameChange}
							/>
						</div>

						<Link to={"/sequence/1"}>
							<button className="btn btn-outline-success">Begin</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
