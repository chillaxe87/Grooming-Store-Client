import React, { useContext , useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import { LoginContext } from "../../context/LoginContext";
import { logoutAction } from "../../actions/loginAction";
import { deleteUserFromCookie, getUserFromCookie } from "../../cookies/cookies";

const Header = () => {

	const { userData, dispatchUserData } = useContext(LoginContext);
	const [nameToDisplay, setNameToDisplay]  = useState("")
	
	const history = useHistory();

	useEffect (() => {
		console.log("logged in")
		if(userData.user != null){
			setNameToDisplay(userData.user.userName)
		} else {
			setNameToDisplay("")
		}
	},[userData.user])

	const onClickShowLoginForm = (event) => {
		history.push("/login")
	}

	const onClickShowSubscribeForm = (event) => {
		history.push("/subscribe")
	}

	const onClickAppintments = () => {
		history.push("/Appointments")
	}
	const onClickLogout = () => {
		dispatchUserData(logoutAction());
		deleteUserFromCookie();
		history.push("/");
	};
    return (
        <div className="header">
			<div className="header__nav">		
				<div onClick={onClickAppintments}>Appointments</div>
				{
					!userData.user ?
					<div className="header__nav-login">	
                        <div onClick={onClickShowLoginForm}>Login</div>
                 	    <div onClick={onClickShowSubscribeForm}>Subscribe</div>  						
				    </div> :
				    <div className="header__nav-login">	
				        <div className="userName">{nameToDisplay}</div>
                        <div onClick={onClickLogout}>Logout</div>					
			    	</div>
				}
			</div>
		</div>
    )
}

export default Header