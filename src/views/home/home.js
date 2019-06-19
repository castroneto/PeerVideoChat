import React, {useState} from 'react';
import './home.css';
const Home = ({ props }) => {
	//console.log()
	const [peerId, setPeerId] = useState("");

  return (
    <div className="limiter">
		<div className="container-login100">
        <div className="wrap-login100">
        <form className="login100-form validate-form">

			<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
				<input 
				 className="input100" 
				 type="text"
				 value={peerId}
				 onChange={e => setPeerId(e.target.value)} 
				 name="email"
				 placeholder="ROOM-ID"/>
				<span className="focus-input100"></span>
				<span className="symbol-input100">
					<i className="fa fa-connectdevelop" aria-hidden="true"></i>
				</span>
			</div>
      <div className="container-login100-form-btn">
				<button 
				 type="button"
				 onClick={() => {
					props.history.push('/room/' + peerId)
				 }}
				 className="login100-form-btn-green">	Entrar	</button>
			</div>
      <br/>
      <hr/>
			<div className="container-login100-form-btn">
				<button type="button" 
					onClick={() => {
						props.history.push('/room')
					}}
					className="login100-form-btn">
					Criar Nova
				</button>
			</div>
		</form>
		</div>
        </div>
    </div>
  );
}

export default Home;