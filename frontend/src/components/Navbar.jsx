import React, { useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Context } from "../main";

function Navbar() {
  const { setIsAuthenticated, isAuthenticated } = useContext(Context);
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "https://backend-oa64.onrender.com/logout",
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <nav>
        <a href="/">HOME</a>
        <Link onClick={handleLogout}>LOGOUT</Link>
      </nav>
    </>
  );
}

export default Navbar;
