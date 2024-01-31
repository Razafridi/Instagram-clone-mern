import React, { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../../Components/Comments";
import { FaCommentSlash, FaComments } from "react-icons/fa";
import { SERVER_URL } from "../../constants/constants";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addCommentToPost } from "../../Redux/postsReducers";

function CommentScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const currentPost = posts.filter((post) => post._id === id);

  //   UseState
  const [text, setText] = useState("");

  const addComment = async () => {
    //postId, comment

    try {
      const response = await axios.post(
        `${SERVER_URL}posts/comment`,
        { postId: id, comment: text },
        { withCredentials: true }
      );

      console.log(response);
      dispatch(addCommentToPost({ id, post: response.data.post }));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    setText("");
  };
  console.log(posts);
  return (
    <div className="flex flex-col">
      {/* comment show */}
      {currentPost[0].comments.length === 0 ? (
        <div className="flex gap-2 h-[85vh]  justify-center items-center">
          <FaCommentSlash />
          <p className="font-medium text-lg">No Comments Yet</p>
        </div>
      ) : (
        <div className="flex flex-col h-[85vh] p-2 overflow-y-scroll  ">
          {currentPost[0].comments.map((item) => {
            return <Comment comment={item.comment} date={item.publishedAt} />;
          })}
        </div>
      )}

      {/* Comment controllers */}

      <div className="p-4 flex border-t justify-center items-center">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Comment"
          className="p-2  border border-gray-400 "
        />
        <button
          onClick={addComment}
          className="bg-red-500 px-6 py-[13px] rounded-sm"
        >
          <AiOutlineSend />
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default CommentScreen;
