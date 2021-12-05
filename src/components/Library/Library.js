import React, { useEffect, useState } from 'react';

/* PROPS
    
*/
export default function Library(props) {
    const [media, setMedia] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3005/api/likes/user/tmdb', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer: ${props.token}`
        }
      }).then(res => {
        res.json().then(data => {
            console.log(data)
        });
      });
    }, []);

    return (
        <div id="library">
            <h2>Library</h2>
            <hr/>
            <div className="library-grid">
            </div>
        </div>
    );
}