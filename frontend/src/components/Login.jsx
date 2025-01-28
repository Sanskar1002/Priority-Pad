import React, { useContext, useState } from "react";
import Logo from "../assets/logo1.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
// import {toast} from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const {login} = useContext(AuthContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message, { autoClose: 500 });
        login();
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 1000 });
      // console.log(error.response.data.message)
    }
  };

  return (
    <section className="h-screen w-screen bg-gray-200 flex flex-col gap-4 items-center justify-center">
      <img src={Logo} alt="" className="w-[300px]" />
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-xl font-bold">Login </h1>
        <div className="flex items-start flex-col w-full">
          <label htmlFor="email">Email</label>
          <input
            value={user.email}
            type="email"
            id="email"
            className="border-b-2 outline-none placeholder:text-[#00005] placeholder:italic w-full"
            name="email"
            placeholder="prioritypad@gmail.com"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-start flex-col justify-center w-full">
          <label htmlFor="password">Password</label>
          <div className="flex items-center justify-between w-full">
            <input
              value={user.password}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="border-b-2 outline-none placeholder:text-[#00005] placeholder:italic w-full"
              placeholder="*********"
              onChange={handleChange}
            />
            <button
              className="border-b-2 py-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        <button
          className="border-4 rounded-4xl px-16 py-2 hover:bg-blue-950 hover:text-white"
          onClick={handleLogin}
        >
          Login
        </button>
        <p>Don't have an account? <Link to={'/signup'} className="text-blue-500 font-bold">Signup</Link></p>
      </div>
    </section>
  );
};

export default Login;
