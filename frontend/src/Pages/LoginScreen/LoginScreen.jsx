import React, { useState } from "react";
import { FaPlus, FaUser } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SERVER_URL } from "../../constants/constants";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Methods

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    console.log(email, password);
    if (email === "" || password === "") {
      toast.error("Please Provide All Fields");
      return;
    }

    try {
      const response = await axios.post(
        `${SERVER_URL}users/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        toast.info("Successfully");
        navigate("/home");
        console.log("Message", response);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-gray-300 flex justify-center items-center h-[100vh]">
      <form
        className="p-10 rounded-lg shadow-sm bg-white flex flex-col"
        onSubmit={submitForm}
      >
        <h1 className="font-bold text-lg">Login</h1>
        {/* Upload Picture */}

        {/* Email */}
        <label className="mt-4 font-semibold text-gray-600">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="hover:border-blue-500 border border-gray-400 rounded-l px-2 py-1 outline-none"
        />

        {/* Password */}
        <label className="mt-4 font-semibold text-gray-600">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="hover:border-blue-500  border border-gray-400 rounded-l px-2 py-1 outline-none"
        />

        <br />

        <button className="flex items-center gap-2 rounded py-2 bg-gradient-to-br from-purple-800 to-rose-500 text-white px-2 py-1 text-sm">
          <FaUser />
          <span>Sign In</span>
        </button>

        <br />
        <Link className="font-semibold text-sm text-blue-700 " to="/">
          Create An Account!
        </Link>
      </form>
      <ToastContainer />
    </div>
  );
}

export default LoginScreen;
