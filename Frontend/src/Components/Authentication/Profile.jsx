import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const Profile = () => {
  const user = localStorage.getItem('user') ? localStorage.getItem('user').replace(/"/g, '') : null
  const jwt_access = localStorage.getItem('access') ? localStorage.getItem('access').replace(/"/g, '') : null
  const refresh = localStorage.getItem('refresh') ? localStorage.getItem('refresh').replace(/"/g, '') : null
  const navigate = useNavigate()

  useEffect(() => {
    if (!jwt_access || !user ) {
      navigate('/login')
    }else{
      getSomeData()
    }
  }, [jwt_access, user]);

  const handleLogout = async () => {

    try {
      const res = await axiosInstance.post("/auth/logout/", {"refresh_token": refresh})
        if (res.status === 200){
          localStorage.removeItem('user')
          localStorage.removeItem('access')
          localStorage.removeItem('refresh')
          navigate('/login');
        }
    }
    catch (error){
      console.error('Error logging out:', error)
    }
  };

  const getSomeData = async () => {
    const res = await axiosInstance.get('/auth/profile/')
    if (res.status === 200){
        console.log(res.data)

    }
    else {
      const res2 = await axiosInstance.get('/auth/profile/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primaryColor">
      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-thirdColor w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Hi {user}</h2>
        <p className="text-gray-600 mb-6">Welcome to Pongify Auth</p>
        <button
          className="w-full bg-thirdColor text-white py-2 rounded-lg hover:bg-forthColor transition duration-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;