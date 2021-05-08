import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

const PasswordCreate = () => {
	const password = React.createRef();
	const confirm_password = React.createRef();

	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		const pword1 = password.current.value;
		const pword2 = confirm_password.current.value;

		// Validate passwords
		const validate = () => {
			setMsg("");

			if (!pword1.trim()) {
				setError("Password required");
				return false;
			}

			if (pword1.trim().length < 6) {
				setError("Password must have at least 6 characters");
				return false;
			}

			const atLeastOneCap = new RegExp(/([A-Z]+)/g);
			if (!atLeastOneCap.test(pword1)) {
				setError("Password must have at least one capital letter");
				return false;
			}

			const atLeastOneLowCase = new RegExp(/([a-z]+)/g);
			if (!atLeastOneLowCase.test(pword1)) {
				setError("Password must have at least one lower case letter");
				return false;
			}

			const atLeastOneDigit = new RegExp(/([0-9]+)/g);
			if (!atLeastOneDigit.test(pword1)) {
				setError("Password must have at least one number");
				return false;
			}

			const atLeastOneSpecial = new RegExp(
				/([!@#$%^&*()_\-+={[}\]|:;"'<,>.]+)/g
			);
			if (!atLeastOneSpecial.test(pword1)) {
				setError("Password must have at least one special character");
				return false;
			}

			if (pword1 !== pword2) {
				setError("Passwords don't match");
				return false;
			}

			setError("");
			setMsg("Success");
			return true;
		};

		if (validate()) {
			// Call the server here
			console.log("Submitted");
		}
	};

	// Dynamic styling for the password boxes
	const getStyle = () => {
		return "form-control " + (error ? "is-invalid" : "");
	};

	// Dynamic styling for the feedback message
	const getMsgStyle = () => {
		return "mb-1 " + (error ? "fs-6 warn" : "fs-4 success");
	};

	return (
		<>
			<h1>Change Password</h1>
			<form
				id="change-password"
				className="pass-box"
				onSubmit={handleSubmit}
			>
				{/* for accessability username should be present, even if hidden */}
				<input
					type="hidden"
					id="username"
					name="username"
					value="currentUserNameFromStore"
				/>
				<div className="form-group mb-3">
					<label htmlFor="password">Password</label>
					<input
						id="password"
						ref={password}
						autoFocus
						type="password"
						className={getStyle()}
						placeholder="Type new password here"
						autoComplete="new-password"
						data-testid="password"
					/>
				</div>
				<div className="form-group mb-2">
					<label htmlFor="confirm_password">Re-enter password</label>
					<input
						id="confirm_password"
						ref={confirm_password}
						type="password"
						className={getStyle()}
						placeholder="Retype new password here"
						autoComplete="new-password"
						data-testid="password2"
					/>
				</div>
				<div className="msg">
					<label className={getMsgStyle()} data-testid="msg">
						{msg + error}
					</label>
				</div>
				<button className="btn btn-primary" data-testid="change-password">
					Change Password
				</button>
			</form>
		</>
	);
};

export default PasswordCreate;
