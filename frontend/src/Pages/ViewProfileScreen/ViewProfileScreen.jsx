import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import Profile from "../../Components/Profile";
import imageFile from "./../../assets/profile.jpg";
import { FaUser } from "react-icons/fa";
import { SERVER_URL } from "../../constants/constants";
import axios from "axios";

function ViewProfileScreen() {
  const params = useParams();

  const [user, setUser] = useState(null);

  const followUser = async (email) => {
    console.log(email);
    try {
      const response = await axios.post(
        `${SERVER_URL}users/follow`,
        { email },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setUser({
        name: response.data.user.name,
        followers: response.data.user.followers,
        following: response.data.user.following,
        post: response.data.user.posts,
        email: response.data.user.email,
      });
    } catch (error) {
      //   if (error.response.status === 401) {
      //     localStorage.removeItem("user");
      //     navigate("/");
      //   }
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}users/get-user/${params.id}`,
          {
            withCredentials: true,
          }
        );
        console.log(response);
        setUser({
          name: response.data.data.name,
          followers: response.data.data.followers,
          following: response.data.data.following,
          post: response.data.data.posts,
          email: response.data.data.email,
        });
      } catch (error) {
        //   if (error.response.status === 401) {
        //     localStorage.removeItem("user");
        //     navigate("/");
        //   }
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  if (user === null) {
    return <h1>Loading</h1>;
  }
  return (
    <div>
      <div className=" h-[100vh]   border-r border-gray-300">
        {/* Profile indo */}
        <div className="flex flex-col items-center py-5">
          <img
            className="w-20 h-20 rounded-full object-cover"
            src={imageFile}
          />
          <div className="flex flex-col items-center">
            <p className="font-bold text-lg mt-4">{user.name}</p>
            <span className="font-thin text-md mb-2 text-gray-600">
              Web Developer from Pakistan
            </span>
          </div>
          {/* Follower ,follwoing etc */}
          <div className="flex gap-8 mt-3">
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold">
                {user.followers === null ? "?" : user.followers.length}
              </p>
              <span className="text-sm text-gray-600">Followers</span>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold">
                {user.following === null ? "?" : user.following.length}
              </p>
              <span className="text-sm text-gray-600">Following</span>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold">
                {user.post === null ? "?" : user.post.length}
              </p>
              <span className="text-sm text-gray-600">Posts</span>
            </div>
          </div>

          <button
            onClick={() => followUser(user.email)}
            className={`flex items-center gap-2 rounded px-6 py-1 mt-3 text-white font-semibold bg-blue-600  `}
          >
            {user.followers.includes(
              JSON.parse(localStorage.getItem("user")).email
            )
              ? "Unfolllow"
              : "Folllow"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewProfileScreen;
