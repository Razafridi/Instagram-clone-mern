import React, { useEffect, useState } from "react";
import { FaPlus, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../constants/constants";

function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/home");
    }
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
    if (name == "" || email === "" || password === "") {
      toast.error("Please Provide All Fields");
      return;
    }

    try {
      const response = await axios.post(`${SERVER_URL}users/register`, {
        name,
        email,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        toast.info("Register Successfully");
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-gray-300 flex justify-center items-center h-[100vh]">
      <form
        className="p-10 rounded-lg shadow-sm bg-white flex flex-col"
        onSubmit={submitForm}
      >
        <h1 className="font-bold text-lg">Sign up</h1>
        {/* Upload Picture */}

        {/* Email */}
        <label className="mt-4 font-semibold text-gray-600">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="hover:border-blue-500 border border-gray-400 rounded-l px-2 py-1 outline-none"
        />

        {/* Name */}
        <label className="mt-4 font-semibold text-gray-600">Name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
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

        <button className="flex items-center gap-2 rounded py-2 bg-gradient-to-bl from-rose-600 to-orange-500 text-white px-2 py-1 text-sm">
          <FaUser />
          <span>Sign Up</span>
        </button>

        <br />
        <Link className="font-semibold text-sm text-blue-700 " to="/login">
          Already Have An Account!
        </Link>
      </form>

      <ToastContainer />
    </div>
  );
}

export default SignUpScreen;
