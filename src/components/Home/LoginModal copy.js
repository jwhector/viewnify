import React, { useState } from 'react';
import ReactModal from 'react-modal';

export default function LoginModal(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <ReactModal isOpen={props.modalOpen} 
            className="login-modal" 
            onRequestClose={props.closeModal}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
            style={{backgroundColor: "salmon"}}>
                <h2 className="">Log In</h2>
                <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email}/>
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password}/>
                <button onClick={props.closeModal} className="close-btn">Close</button>
        </ReactModal>
    );
}