import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { passwordValidator } from "../../utils/auth/validators";
import { useTranslation } from "react-i18next";

const ProfileSettings = () => {
	const { t } = useTranslation();
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [loading, setLoading] = useState(true);
	const {customFetch, tokens, username} = useAuth();
	const [passwords, setPasswords] = useState({
		oldPassword: '',
		newPassword: '',
		confirmPassword: ''
	});
	const [profileMedia, setProfileMedia] = useState({
		profileImage: null,
		coverImage: null
	})
  const [isIntraUser, setIsIntraUser] = useState(false);

  useEffect(() => {
    fetchProfileMedia();
  }, []);

  const fetchProfileMedia = async () => {
    try {
      const response = await customFetch("/api/profile/media/", {
        method: "GET",
        headers: {
          Authorization: `JWT ${tokens.access}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.isIntraUser) {
          setIsIntraUser(true);
        }
        setProfileMedia({
          profileImage: data.profileImage,
          coverImage: data.coverImage,
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleMediaUpload = async (e, mediaType) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const response = await customFetch(`/api/profile/media/${mediaType}/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${tokens.access}`,
      },
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      setProfileMedia((prev) => ({
        ...prev,
        [mediaType === "profile" ? "profileImage" : "coverImage"]:
          data.imageUrl,
      }));
    } else {
      alert("file is too Large, file size should be less than 1Mb");
    }
  };

  const handlePasswordChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
    if (errorMessage) setErrorMessage("");
    else if (successMessage) setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordValidation = passwordValidator(passwords);
    if (!passwordValidation.valid) {
      setErrorMessage(passwordValidation.message);
      return;
    } else {
      const response = await customFetch("/api/auth/change-password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${tokens.access}`,
        },
        body: JSON.stringify({
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
        }),
      });
      const res = await response.json();
      if (!response.ok) {
        setErrorMessage(res.message);
      } else {
        setSuccessMessage(res.message);
      }
    }
    setPasswords({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    profileMedia && (
      <div className="w-full p-4">
        <div className="relative mb-24">
          {/* Cover Photo Section */}
          <div className="h-64 bg-gray-100 rounded-lg overflow-hidden">
            {profileMedia.coverImage ? (
              <img
                src={profileMedia.coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Add Cover Photo</span>
              </div>
            )}
            <label className="absolute top-4 right-4 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleMediaUpload(e, "cover")}
              />
              <div className="bg-white p-2 rounded-full shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </label>
          </div>

          {/* Profile Picture Section */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-100">
                {profileMedia.profileImage ? (
                  <img
                    src={profileMedia.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Add Photo</span>
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleMediaUpload(e, "profile")}
                />
                <div className="bg-white p-2 rounded-full shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Username or Password Change Section */}
        <div className="flex justify-center items-center">
          {isIntraUser ? (
            <h1 className="text-xl font-semibold">{username}</h1>
          ) : (
            <div className="bg-secondaryColor rounded-lg mt-8 w-96">
              <div className="px-6 py-5 border-b border-gray-100 border-opacity-50">
                <h2 className="text-xl font-semibold text-white text-center">
                  {t("Change Password")}
                </h2>
              </div>
              <div className="w-full p-5">
                <form onSubmit={handleSubmit}>
                  <p className="text-red-500 pb-3 font-bold">{errorMessage}</p>
                  <p className="text-green-500 pb-3 font-bold">
                    {successMessage}
                  </p>
                  <div className="mb-4 flex justify-center">
                    <input
                      id="oldPassword"
                      name="oldPassword"
                      placeholder={t("Old Password")}
                      type="password"
                      className="w-full max-w-xs text-primaryColor rounded-md p-2 border border-linkColor"
                      value={passwords.oldPassword}
                      onChange={handlePasswordChange}
                      autoComplete="off"
                    />
                  </div>
                  <div className="mb-4 flex justify-center">
                    <input
                      id="newPassword"
                      name="newPassword"
                      placeholder={t("New Password")}
                      type="password"
                      className="w-full max-w-xs text-primaryColor rounded-md p-2 border border-linkColor"
                      value={passwords.newPassword}
                      onChange={handlePasswordChange}
                      autoComplete="off"
                    />
                  </div>
                  <div className="mb-4 flex justify-center">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder={t("Confirm Password")}
                      type="password"
                      className="w-full max-w-xs text-primaryColor rounded-md p-2 border border-linkColor"
                      value={passwords.confirmPassword}
                      onChange={handlePasswordChange}
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      {t("Update Password")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default ProfileSettings;