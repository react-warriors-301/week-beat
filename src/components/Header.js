import React from 'react'
import Login from './Login';
import LogoutButton from './Logout';
import Profile from './Profile';
import { withAuth0 } from "@auth0/auth0-react";
// import Restaurants from './Restaurants';

class Header extends React.Component {
render() {
    const {isAuthenticated} = this.props.auth0;
    return (
        <>
        <h1>hello from header!</h1>
{isAuthenticated ? <LogoutButton/> : <Login/>}
        <Profile/>
        

        </>
    )
}
}

export default  withAuth0(Header);
