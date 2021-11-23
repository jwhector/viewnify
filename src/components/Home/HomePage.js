import React, { useState } from 'react';
import ReactModal from 'react-modal';
import LoginModal from './LoginModal';

export default function HomePage() {
    const [modalOpen, setModalOpen] = useState(false);

    const showModal = (e) => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <>
            <img id="home-img" alt="Two people on phones, connected via Viewnify." src="" />
            <img id="logo" alt="Viewnify 'V' logo." src="" />
            <button onClick={showModal} className="signup-btn">Sign Up</button>
            {/* <LoginModal modalOpen={modalOpen} /> */}
            <ReactModal 
            isOpen={modalOpen} 
            className="login-modal"
            onRequestClose={closeModal}
            // onAfterClose={closeModal}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
            style={{backgroundColor: "salmon"}}>
                <h2 className="">Sign Up</h2>
                <input type="text" placeholder="User Name"/>
                <input type="password" placeholder="Password"/>
                <button onClick={closeModal} className="close-btn">Close</button>

            </ReactModal>
        </>
    );
}