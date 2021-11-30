import React, { useState } from 'react';
import ReactModal from 'react-modal';
import LoginModal from '../LoginModal';
import './LandingPage.css';

export default function LandingPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    // const setLogin = (e) =>{
    //     setIsLogin(true);
    //     setModalOpen(true);
    // }

    const setSignup = (e) =>{
        setIsLogin(false);
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    ReactModal.setAppElement('#root');

    return (
        <>
            <img id="home-img" alt="Two people on phones, connected via Viewnify." src="" />
            <img id="logo" alt="Viewnify 'V' logo." src="" />
            <button onClick={setSignup} className="signup-btn">Sign Up</button>
            {/* <button onClick={setLogin} className="signup-btn">Log In</button> */}
            <LoginModal modalOpen={modalOpen} closeModal={closeModal} isLogin={isLogin} />
            {/* <ReactModal 
                isOpen={modalOpen} 
                className="login-modal"
                onRequestClose={closeModal}
                shouldCloseOnEsc={true}
                shouldCloseOnOverlayClick={true}
                style={{backgroundColor: "salmon"}}>
                    <h2 className="">Sign Up</h2>
                    <input type="text" placeholder="User Name"/>
                    <input type="password" placeholder="Password"/>
                    <button onClick={closeModal} className="close-btn">Close</button>
            </ReactModal> */}
        </>
    );
}