import React, {useState} from 'react';
import './login.css';
import 'font-awesome/css/font-awesome.min.css';
import HttpService from '../services/http';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = function(event){
        event.preventDefault();
        HttpService.axios.post('login', {email: email, password: password}).then((data)=>{
            console.log(data)
        }).catch((error)=>{
            console.log(error)
        })
    }
    return (
        <div className="limiter">
		<div className="container-login100">
        <div className="wrap-login100">
        <form className="login100-form validate-form" onSubmit={login}>
			<span className="login100-form-title">
				Hello
			</span>

			<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
				<input className="input100" type="text" name="email" onChange={e => setEmail(e.target.value)} placeholder="Email"/>
				<span className="focus-input100"></span>
				<span className="symbol-input100">
					<i className="fa fa-envelope" aria-hidden="true"></i>
				</span>
			</div>
					
			<div className="container-login100-form-btn">
				<button type="submit" className="login100-form-btn">
					Entrar
				</button>
			</div>
		</form>
		</div>
        </div>
    </div>
    )
}

export default Login;