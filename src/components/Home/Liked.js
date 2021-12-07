import { useState } from "react";

export default function Liked(props) {

    const Liked = () => {
        const [tmbd, setTMBD] = useState('');
        const [user, setUser] = useState('');
        
        
        const handleSubmit = (e) => {
            e.preventDefault();
            const likeMovie = { tmbd, user}
            
            fetch('https://viewnify-server.herokuapp.com/user', {
                method: 'POST',
                headers: { "Content-Type": "application/json "},
                body: JSON.stringify(likeMovie)
            }).then(() => {
                console.log("movie liked!")
            })
        }
        
        return (
            <button id="play-pause">
            <form onSubmit={handleSubmit}></form>
        </button>
    )
}
}