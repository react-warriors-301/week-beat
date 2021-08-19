import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "./Header";
import '../CSS/profile.css'
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>
            <img src="https://i.ibb.co/ZG3XLq2/loadergif.gif" alt="loadergif" border="0" style={{width:'20px'}}/>

    </div>;
  }

  return (
    <>
    <Header/>

    {
    isAuthenticated && (
      <center>
      <div className="card-container">
			<header>
				<img className="proImg"src={user.picture} />
			</header>
			<h1 className="bold-text">
				{user.name}<span className="normal-text">{user.birthday}</span>
			</h1>
			<h2 className="normal-text">{user.email}</h2>
		{/* 	<div className="social-container">
				<div className="followers">
					<h1 className="bold-text">120</h1>
					<h2 className="smaller-text">Followers</h2>
				</div>
				<div className="likes">
					<h1 className="bold-text">35</h1>
					<h2 className="smaller-text">Likes</h2>
				</div>
				<div className="photos">
					<h1 className="bold-text">12</h1>
					<h2 className="smaller-text">Photos</h2>*/}
				</div> 
        </center>
    )}
    </>
  );
};

export default Profile;