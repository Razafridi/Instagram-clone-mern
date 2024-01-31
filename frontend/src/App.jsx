import axios from "axios";
import react, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./Pages/HomeScreen/HomeScreen";
import SignUpScreen from "./Pages/SignUpScreen/SignUpScreen";
import LoginScreen from "./Pages/LoginScreen/LoginScreen";
import CommentScreen from "./Pages/CommentScreen/CommentScreen";
import CreatePostScreen from "./Pages/CreatePostScreen/CreatePostScreen";
import ViewProfileScreen from "./Pages/ViewProfileScreen/ViewProfileScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/" element={<SignUpScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/comment/:id" element={<CommentScreen />} />
        <Route path="/create-post" element={<CreatePostScreen />} />
        <Route path="/profile/:id" element={<ViewProfileScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
