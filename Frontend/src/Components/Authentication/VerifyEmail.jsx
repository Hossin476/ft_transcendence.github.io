import React, {useState} from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [otpCode, setotpCode] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setotpCode(e.target.value);
    if (errorMessage !== "")
      setErrorMessage("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/auth/verify-email/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({otp: otpCode})
    })
    const data = await res.json();
    console.log(data);
    if (res.status === 200)
      navigate("/loogin");
    else {
      setErrorMessage(data.message);
      toast.error(data.message);}
  }

  return (
    <div className="bg-secondaryColor min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl shadow-thirdColor w-full max-w-md">
        <h2 className="text-2xl font-bold text-black mb-6">Verify Email</h2>
        <p className="text-gray-500 text-sm mb-6">Enter the OTP code sent to your email</p>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-black mb-1"></label>
              <input
                type="text"
                name="otp"
                value={otpCode}
                onChange={handleChange}
                placeholder="OTP Code"
                className="bg-white text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <p className="text-red-500 px-3 font-bold">{errorMessage ? errorMessage : ""}</p>
            <input
              type="submit"
              value="Login"
              className="w-full bg-secondaryColor text-white py-2 rounded-lg hover:bg-thirdColor transition duration-300"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;