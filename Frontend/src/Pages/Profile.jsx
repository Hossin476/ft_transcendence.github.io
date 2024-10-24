import React from 'react';
import './Profile.css';

function Profile_info() {
  return (
    <>
      <div className="profile_info"></div>
    </>
  );
}


function Profile_history() {
  return (
    <>
      <div className="profile_history"></div>
    </>
  );
}

function Profile_friends() {
  return (
    <>
      <div className="profile_friends"></div>
    </>
  );
}


function Profile() {
  return (
    <div className='holder_all'>
      <div className="holder_profile" >
        <Profile_info/>
        <Profile_history/>
      </div>
      <div className="holder_friends">
        <Profile_friends/>
      </div>
    </div>
  );
}

export default Profile;
