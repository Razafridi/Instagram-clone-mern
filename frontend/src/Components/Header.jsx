import React from "react";
import { Link } from "react-router-dom";
import imageFile from "../assets/profile.jpg";
import {
  AiOutlineInstagram,
  AiOutlineNotification,
  AiOutlineMenu,
  AiOutlineLogout,
} from "react-icons/ai";
import { FaSearch, FaMicrophone, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IconButton from "./IconButton";
import { SERVER_URL } from "../constants/constants";
function Header({ updateState }) {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await axios.post(
        `${SERVER_URL}users/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-2 flex items-center justify-between">
      <Link to="/home" className="flex justify-center items-center">
        <AiOutlineInstagram />
        <span className="ml-1 font-semibold">Instagram</span>
      </Link>
      <div className="flex gap-2">
        <div className="flex gap-2 items-center mx-4 border rounded-2xl px-2 py-1">
          <FaSearch className="opacity-50" />
          <input
            onChange={(e) => {
              if (e.target.value.length > 0) {
                updateState(false, e.target.value);
              } else {
                updateState(true);
              }
            }}
            placeholder="Search"
            className="outline-none px-2"
          />
          <FaMicrophone className="opacity-50" />
        </div>

        <button
          onClick={() => navigate("/create-post")}
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-bl from-rose-600 to-orange-500 text-white px-2 py-1 text-sm"
        >
          <FaPlus />
          <span>Create New Post</span>
        </button>
      </div>
      <div className="flex gap-2 items-center mx-4">
        <AiOutlineNotification />
        <IconButton
          Icon={AiOutlineLogout}
          title={"Logout"}
          color={"red"}
          hanlder={logout}
        />
      </div>
    </div>
  );
}

export default Header;
