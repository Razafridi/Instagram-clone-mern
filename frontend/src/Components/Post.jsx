import React from "react";
import {
  FaBookmark,
  FaEllipsisV,
  FaRegBookmark,
  FaShare,
  FaShareAlt,
  FaShareAltSquare,
} from "react-icons/fa";
import imageFile from "./../assets/profile.jpg";
import IconButton from "./IconButton";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addLike } from "../Redux/postsReducers";
import { useNavigate } from "react-router-dom";

import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineSave,
  AiOutlineShareAlt,
  AiOutlineUsb,
  AiOutlineUser,
} from "react-icons/ai";
import { SERVER_URL } from "../constants/constants";
function Post({ data }) {
  // Reducer and dispatch
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  //

  const navigate = useNavigate();

  const likePost = async (id) => {
    try {
      const response = await axios.post(
        `${SERVER_URL}posts/like`,
        { postId: id },
        { withCredentials: true }
      );

      console.log(response);
      dispatch(addLike({ id, post: response.data.post }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-lg p-3">
      {/* Profile */}
      <div className="flex justify-between">
        {/* Image */}
        <div className="flex gap-2 items-center">
          <img src={imageFile} className="w-8 h-8 rounded-full object-cover" />

          <div className="flex flex-col space-y-0 ">
            <span className="text-sm font-bold">Raz Muhammad</span>
            <span className="text-sm text-gray-500">Web Developer</span>
          </div>
        </div>
        {/* Icon */}

        <FaEllipsisV />
      </div>

      <p className="p-2 text-md font-thin">{data.caption}</p>

      {/* Post */}

      <div className="mt-2">
        <img
          src={`http://localhost:3000/uploads/${data.photo}`}
          className="w-full h-[300px] object-cover rounded-lg "
        />
      </div>

      {/* Actions */}

      <div className="flex justify-between p-2">
        <IconButton
          title={`${data.likes.length} Likes`}
          Icon={
            data.likes.includes(JSON.parse(localStorage.getItem("user"))._id)
              ? AiFillHeart
              : AiOutlineHeart
          }
          color={
            data.likes.includes(JSON.parse(localStorage.getItem("user"))._id)
              ? "red"
              : "black"
          }
          hanlder={() => likePost(data._id)}
        />

        <IconButton
          title={`${data.comments.length} 
          Comments`}
          Icon={AiOutlineMessage}
          hanlder={() => {
            navigate(`/comment/${data._id}`);
          }}
        />

        <IconButton
          title="5 Shares"
          Icon={AiOutlineShareAlt}
          hanlder={() => {}}
        />

        <IconButton title="Favourite" Icon={FaRegBookmark} hanlder={() => {}} />
      </div>
    </div>
  );
}

export default Post;
