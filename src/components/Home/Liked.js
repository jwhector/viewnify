import { useState } from "react";

export default function Liked(props) {

    const Liked = () => {
        const [tmbd, setTMBD] = useState('');
        const [user, setUser] = useState('');
        
        
        const handleSubmit = (e) => {
            e.preventDefault();
            const likeMovie = { tmbd, user}
            
            fetch('http://localhost:3005/user', {
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