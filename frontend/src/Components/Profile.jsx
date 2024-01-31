import React, { useEffect, useState } from "react";
import imageFile from "./../assets/profile.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../constants/constants";
function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "Loading...",
    photo: imageFile,
    followers: null,
    following: null,
    post: null,
  });
  useEffect(() => {
    const fetchUser = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        navigate("/");
      }

      try {
        const response = await axios.get(`${SERVER_URL}users/`, {
          withCredentials: true,
        });
        console.log(response);
        setUser({
          name: response.data.data.name,
          followers: response.data.data.followers,
          following: response.data.data.following,
          post: response.data.data.posts,
        });
      } catch (error) {
        if (error.response.status === 401) {
          localStorage.removeItem("user");
          navigate("/");
        }
        console.log(error);
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="w-[20%] h-[100vh]   border-r border-gray-300">
      {/* Profile indo */}
      <div className="flex flex-col items-center py-5">
        <img className="w-20 h-20 rounded-full object-cover" src={imageFile} />
        <div className="flex flex-col items-center">
          <p className="font-bold text-sm">{user.name}</p>
          <span className="font-thin text-sm text-gray-600">
            Web Developer from Pakistan
          </span>
        </div>
        {/* Follower ,follwoing etc */}
        <div className="flex gap-2 mt-3">
          <div className="flex flex-col items-center">
            <p className="text-sm font-bold">
              {user.followers === null ? "?" : user.followers.length}
            </p>
            <span className="text-sm text-gray-600">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm font-bold">
              {user.following === null ? "?" : user.following.length}
            </p>
            <span className="text-sm text-gray-600">Following</span>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm font-bold">
              {user.post === null ? "?" : user.post.length}
            </p>
            <span className="text-sm text-gray-600">Posts</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
