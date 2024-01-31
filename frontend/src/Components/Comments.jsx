import React, { useEffect, useState } from "react";

function Comment({ comment, date }) {
  const getDate = (d) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const now = new Date(d);
    const full =
      now.getDate() +
      " " +
      months[now.getMonth()] +
      " " +
      (now.getHours() % 12) +
      ":" +
      now.getMinutes() +
      (now.getHours() > 12 ? " PM" : " AM");

    return full;
  };
  return (
    <div className="p-2 shadow-md max-w-[400px] m-2 border">
      <p className="text-sm font-semibold">{comment}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm font-thin ">{getDate(date)}</span>
        <span className="text-xs font-semibold ">By Raz </span>
      </div>
    </div>
  );
}

export default Comment;
