import React from 'react'
import Discover from '../Discover/Discover';
import Invite from '../Invite/Invite';

function WatchParty() {

return (
    <>
    <div class="profile-circles">

    <div class="user-watch">USER
    </div>
    <div class="match-watch">match</div>
    </div>
    
    <div class="watch-header">Watch Party</div>
    <ul class="create-party">Create Party
        <link to={Invite}></link>
    </ul>
    <ul class="discover">Discover
        <link to="/discover"></link>
    </ul>
    <div class="watch-content">Parties</div>
    </>
)
}

export default WatchParty;
