import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { SERVER_URL } from "../../constants/constants";
import { useNavigate } from "react-router-dom";

function CreatePostScreen() {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();
  const submitPost = async (e) => {
    e.preventDefault();
    if (caption === "") {
      toast.error("Provide Caption Please");
      return;
    }
    if (file === null) {
      toast.error("Provide Image Please");
      return;
    }
    const form = new FormData();
    form.append("caption", caption);
    form.append("photo", file);

    try {
      const response = axios.post(`${SERVER_URL}posts/add`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      toast.success("Image upload successfully");
      console.log(response);
      navigate("/home");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <form className="flex flex-col p-6 shadow-md " onSubmit={submitPost}>
        <h1 className="text-lg font-semibold py-2">Enter Post Details....</h1>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          className="p-2 bg-red-100 rounded-md"
        />
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border p-1 mt-4 h-20 outline-none hover:border-gray-400 rounded-md"
          placeholder="Caption..."
        ></textarea>

        <button className="p-2 rounded-sm bg-gradient-to-br mt-6 rounded-md to-blue-500 from-rose-600 text-white text-md font-semibold">
          Post
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default CreatePostScreen;
