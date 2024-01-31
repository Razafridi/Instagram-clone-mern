import React from "react";
import imageFile from "./../assets/profile.jpg";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
function Users({ users }) {
  console.log(users);
  return (
    <div>
      {users.map((item) => {
        return <User data={item} />;
      })}
    </div>
  );
}

const User = ({ data }) => {
  return (
    <div className="flex justify-between p-2 mx-1 items-center shadow-lg rounded-md bg-white mt-2 min-w-[500px]">
      <div className="flex items-center">
        {data.photo === "default.jpg" ? (
          <AiOutlineUser className="w-12 h-12 rounded-full border border-gray-300 " />
        ) : (
          <img
            className="w-12 h-12 rounded-full object-cover  "
            src={`http://localhost:3000/uploads/${data.photo}`}
          />
        )}

        <p className="text-sm font-semibold mx-2">{data.name}</p>
      </div>

      <Link
        className="bg-blue-400 rounded-lg p-2 font-semibold text-white ml-5"
        to={`/profile/${data._id}`}
      >
        View Details
      </Link>
    </div>
  );
};

export default Users;
