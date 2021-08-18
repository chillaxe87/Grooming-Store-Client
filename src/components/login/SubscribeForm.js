import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SubscribeFrom = (props) => {

    const history = useHistory();

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
	const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")



    const [isEmailInputValid, setIsEmailInputValid] = useState(true);
    const [isNameInputValid, setIsNameInputValid] = useState(true)
	const [isPasswordInputValid, setIsPasswordInputValid] = useState(true);
    const [isRepeatPasswordInputValid, setIsRepeatPasswordInputValid] = useState(true);

    const isFormInValid = () => {
		return email === "" || password === "" || name === "" || !isRepeatPasswordInputValid;
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

    const onBlurNameInput = (event) => {
		const typedName = event.target.value.trim();
		if(typedName === ""){
			setName("")
			setIsNameInputValid(false);
		} else {
			setName(typedName);
			setIsNameInputValid(true);
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
            setIsRepeatPasswordInputValid(typedPassword === repeatPassword)
		}
	}

    const onBlurRepeatPasswordInput = (event) => {
		const typedPassword = event.target.value.trim();
		if(typedPassword === ""){
			setRepeatPassword("");
            setIsRepeatPasswordInputValid(false)
		} else {	
			setIsRepeatPasswordInputValid(typedPassword === password);
		}
	}

    const onSubmitForm = (event) => {
        event.preventDefault();
        history.push("/appointments");
    }
	return (       
		<div className="login-form">

		    <div className="login-form__body">
                <h3>Subscribe</h3>
	        	<form onSubmit={onSubmitForm}>
			    	<input placeholder="Email" onBlur={onBlurEmailInput} />
                    { !isEmailInputValid && <div className="invalid-message">Enter Email</div> }
                    <input placeholder="Name" onBlur={onBlurNameInput}/>
                    { !isNameInputValid && <div className="invalid-message">Enter Name</div> }
				    <input type="password" placeholder="Password" onBlur={onBlurPasswordInput}/>
                    { !isPasswordInputValid && <div className="invalid-message">Enter Password</div> }
                    <input type="password" placeholder="Repeat Password" onBlur={onBlurRepeatPasswordInput}/>
                    { !isRepeatPasswordInputValid && <div className="invalid-message">Password Not Matching</div> }
				    <button type="submit" disabled={isFormInValid()}>Submit</button>					
			    </form>
	        </div>
		</div>
	)
}

export default SubscribeFrom