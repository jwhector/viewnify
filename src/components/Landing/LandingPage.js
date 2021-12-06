import React, { useState } from 'react';
import ReactModal from 'react-modal';
import LoginModal from './LoginModal';
import './LandingPage.css';
import logo from './Viewnify-logo.png';

export default function LandingPage(props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const setSignup = (e) => {
        setIsLogin(false);
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
        console.log(props);
    }

    ReactModal.setAppElement('#root');

    return (
        <div class="fade">

        <div id="landing">
            {/* <img id="home-img" alt="Two people on phones, connected via Viewnify." src="" /> */}
            <img id="logo-img" alt="Viewnify 'V' logo." src={logo} />
            <h2 id="slogan" className="title-txt">Everyone's entertained.<span className="tm">™</span></h2>
            <button id="signup-btn" onClick={setSignup} className="styled-btn title-txt">Join Now</button>
            <LoginModal setToken={props.setToken} modalOpen={modalOpen} closeModal={closeModal} isLogin={isLogin} />
        </div>
        </div>
    );
}