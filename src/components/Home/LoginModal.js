import React from 'react';
import ReactModal from 'react-modal';

export default function LoginModal(props) {
    return (
        <ReactModal isOpen={props.modalOpen} className="login-modal">
            <h2 className="">Sign Up</h2>
            <input type="text" placeholder="User Name"/>
            <input type="password" placeholder="Password"/>
        </ReactModal>
    );
}