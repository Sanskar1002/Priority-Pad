import React, { useContext } from "react";
import Logo from "../assets/logo1.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        logout();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-between items-center px-16 max-lg:px-10 py-10 bg-[#ff952e]">
      <img src={Logo} alt="logo" className="w-50" />
      <button
        className="px-4 py-2 border-b-gray-950 text-white bg-gray-950 rounded-4xl"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
