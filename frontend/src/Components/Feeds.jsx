import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../constants/constants";
import { addPosts } from "../Redux/postsReducers";
import { useDispatch, useSelector } from "react-redux";
function Feeds() {
  // const [posts, setPosts] = useState(null);

  // Reducer and dispatch
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  //
  const navigate = useNavigate();

  return (
    <div className="w-800px sm:w-[80%] lg:w-[60%] p-4">
      <h1 className="font-bold text-lg">Feeds</h1>
      {/* Posts */}
      <div className="overflow-scroll h-[100vh] over">
        {posts === null
          ? "No Post Found"
          : posts.map((post, index) => {
              return <Post data={post} key={index} />;
            })}
      </div>
    </div>
  );
}

export default Feeds;
