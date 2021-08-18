import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const LoginFrom = (props) => {

	const history = useHistory();

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isEmailInputValid, setIsEmailInputValid] = useState(true);
	const [isPasswordInputValid, setIsPasswordInputValid] = useState(true);


	const isFormInValid = () => {
		return email === "" || password === "";
	}

	const onBlurEmailInput = (event) => {
		const typedEmail = event.target.value.trim();
		if(typedEmail === ""){
			setEmail("")
			setIsEmailInputValid(false);
		} else {
			setEmail(typedEmail);
			setIsEmailInputValid(true);
		}
	}

	const onBlurPasswordInput = (event) => {
		const typedPassword = event.target.value.trim();
		if(typedPassword === ""){
			setPassword("")
			setIsPasswordInputValid(false);
		} else {
			setPassword(typedPassword);
			setIsPasswordInputValid(true);
		}
	}

	const onSubmitForm = (event) => {
		event.preventDefault();
		history.push("/appointments")
	}

	return (
		<div className="login-form">
		    <div className="login-form__body">
			    <h3>Login</h3>
	        	<form onSubmit={onSubmitForm}>
			    	<input placeholder="Email" onBlur={onBlurEmailInput}/>
					{ !isEmailInputValid && <div className="invalid-message">Invalid Email</div> }
				    <input type="password" placeholder="Password" onBlur={onBlurPasswordInput}/>
					{ !isPasswordInputValid && <div className="invalid-message">Invalid Password</div> }
				    <button type="submit" disabled={isFormInValid()}>Login</button>					
			    </form>
	        </div>
		</div>
	)
}

export default LoginFrom