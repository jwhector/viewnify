import React, { useState } from 'react';
import ReactModal from 'react-modal';


async function loginUser(credentials) {
    return fetch('REPLACE THIS URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(data => data.json());
}

async function signupUser(credentials) {
    return fetch('REPLACE THIS URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(data => data.json());
}
 
     
export default function LoginModal(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmText, setConfirmText] = useState('');

    const handleLogin = async e => {
        e.preventDefault();
        // const token = await loginUser({
        //   email,
        //   password
        // });
        setEmail('');
        setPassword('');
        // if (token) {
            console.log(email, password);
            props.closeModal();
            // props.setToken(token);
        // } else {
        //     setConfirmText('Email or password incorrect!');
        // }
    }

    const handleSignup = async e => {
        e.preventDefault();

        console.log(email, password, confirmPassword);

        if (password === confirmPassword) {
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            clearModal();
            // props.closeModal();
        } else{
            setConfirmText('Passwords did not match! Please try again.');
            setPassword('');
            setConfirmPassword('');
        }
    }

    const clearModal = () => {
        setConfirmText('');
        props.closeModal();
    }

    const isLogin = props.isLogin;

    if (isLogin){
        return (
            <ReactModal isOpen={props.modalOpen} 
            className="login-modal" 
            onRequestClose={clearModal}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
            style={{backgroundColor: "salmon"}}>
                <h2 className="">Log In</h2>
                <h3>{confirmText}</h3>
                <form>
                    <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email}/>
                    <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password}/>
                    <button onClick={handleLogin}>Submit</button>
                </form>
                <button onClick={clearModal} className="close-btn">Close</button>
            </ReactModal>
        );
    }

    return (
        <ReactModal isOpen={props.modalOpen} 
            className="login-modal" 
            onRequestClose={clearModal}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
            style={{backgroundColor: "salmon"}}>
                <h2 className="">Sign Up</h2>
                <h3>{confirmText}</h3>
                <form>
                    <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email}/>
                    <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password}/>
                    <input type="password" placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword}/>
                    <button onClick={handleSignup}>Submit</button>
                </form>
                <button onClick={clearModal} className="close-btn">Close</button>
        </ReactModal>
    );
}