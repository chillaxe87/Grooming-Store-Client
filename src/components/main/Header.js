import React from 'react';
import { useHistory } from 'react-router-dom';
// import LoginFrom from '../login/LoginForm';
// import SubscribeFrom from '../login/SubscribeForm';

const Header = () => {


	
	const history = useHistory();

	const onClickShowLoginForm = (event) => {
		history.push("/login")
	}

	const onClickShowSubscribeForm = (event) => {
		history.push("/subscribe")
	}

	const onClickAppintments = () => {
		history.push("/Appointments")
	}
    return (
        <div className="header">
			<div className="header__nav">		
				<div onClick={onClickAppintments}>Appointments</div>
				<div className="header__nav-login">	
                    <div onClick={onClickShowLoginForm}>Login</div>
                 	<div onClick={onClickShowSubscribeForm}>Subscribe</div>    				
				</div>
			</div>
		</div>
    )
}

export default Header