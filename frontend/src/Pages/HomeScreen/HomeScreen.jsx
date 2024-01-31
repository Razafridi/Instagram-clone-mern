import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Profile from "../../Components/Profile";
import Feeds from "../../Components/Feeds";
import Empty from "../../Components/Empty";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../constants/constants";
import Users from "../../Components/Users";
import { useDispatch } from "react-redux";
import { addPosts } from "../../Redux/postsReducers";

function HomeScreen() {
  const [showFeed, setShowFeed] = useState(true);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function updateState(state, val = "") {
    setShowFeed(state);

    try {
      const res = await axios.get(`${SERVER_URL}users/get-all`, {
        withCredentials: true,
      });
      setUsers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        navigate("/");
      }

      try {
        const response = await axios.get(`${SERVER_URL}posts/get-all`, {
          withCredentials: true,
        });
        console.log(response);
        dispatch(addPosts(response.data.data));
      } catch (error) {
        console.log(error);
        // if (error.response.status && error.response.status === 401) {
        //   localStorage.removeItem("user");
        //   navigate("/");
        // }
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className="bg-gray-200">
      <Header updateState={updateState} />
      {/* Main page with profile */}
      <div className="flex justify-center">
        {/* <Profile /> */}
        {showFeed ? <Feeds /> : <Users users={users} />}
        {/* <Empty /> */}
      </div>
    </div>
  );
}

export default HomeScreen;
