import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { saveUserOnCookie } from "../../cookies/cookies";
import { loginToSite } from "../../server/auth";
import { loginAction } from "../../actions/loginAction";
import validator from "validator";

const LoginFrom = (props) => {

	const { userData, dispatchUserData } = useContext(LoginContext);

	const history = useHistory();

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isEmailInputValid, setIsEmailInputValid] = useState(true);
	const [isPasswordInputValid, setIsPasswordInputValid] = useState(true);

	useEffect(() => {
		if (!!userData.user) {
			history.push('/Appointments?page=1')
		}
	}, [history, userData.user]);

	const isFormInValid = () => {
		return email === "" || password === "";
	}

	const onBlurEmailInput = (event) => {
		const typedEmail = event.target.value.trim().toLowerCase();
		console.log(validator.isEmail(typedEmail))

		if (typedEmail === "" || !validator.isEmail(typedEmail)) {
			setEmail("")
			setIsEmailInputValid(false);
		} else {
			setEmail(typedEmail);
			setIsEmailInputValid(true);
		}
	}

	const onBlurPasswordInput = (event) => {
		const typedPassword = event.target.value.trim();
		if (typedPassword === "") {
			setPassword("")
			setIsPasswordInputValid(false);
		} else {
			setPassword(typedPassword);
			setIsPasswordInputValid(true);
		}
	}

	const onSubmitForm = (event) => {
		event.preventDefault();
		console.log("login: ", email, password)

		loginToSite(email, password).then(
			(userData) => {
				dispatchUserData(loginAction(userData));
				saveUserOnCookie(userData);
				history.push('/Appointments?page=1')
				window.location.reload()
			}, (err) => {
				setIsEmailInputValid(false);
				setIsPasswordInputValid(false);
				console.log(err)
			}
		)
	}

	return (
		<div className="login-form">
			<div className="login-form__body">
				<h3>Login</h3>
				<form onSubmit={onSubmitForm}>
					<input placeholder="Email" onBlur={onBlurEmailInput} />
					{!isEmailInputValid && <div className="invalid-message">Invalid Email</div>}
					<input type="password" placeholder="Password" onBlur={onBlurPasswordInput} />
					{!isPasswordInputValid && <div className="invalid-message">Invalid Password</div>}
					<button type="submit" disabled={isFormInValid()}>Login</button>
				</form>
			</div>
		</div>
	)
}

export default LoginFrom