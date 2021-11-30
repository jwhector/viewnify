import React, { useState } from 'react';
import LoginModal from './LoginModal';
//3005

export default function NavBar(props) {
    const [modalOpen, setModalOpen] = useState(false);

    const setLogin = (e) => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <div id="nav">
            <h1 className="text-logo"><span className="vertical-ctr">view<span className="bold">nify</span></span></h1>
            <h1 className="text-logo shadowed"><span className="vertical-ctr">view<span className="bold">nify</span></span></h1>
            {props.showLogin ?
                <>
                    <button onClick={setLogin} id="login-btn">Log In</button>
                    <LoginModal modalOpen={modalOpen} closeModal={closeModal} isLogin={true}  />
                </> : <></>}
        </div>
    );
}