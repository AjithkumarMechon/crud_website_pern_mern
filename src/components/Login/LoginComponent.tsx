"use client";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const LoginComponent = (): JSX.Element => {
  const [visiblePw, setVisiblePw] = useState<Boolean>(false);
  // const [data, setData] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const route = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      const url = process.env.HOST_ENV || "";
      const response = await axios.post(url, values);
      console.log("response", response);    
      if (response.status === 200) {
        Cookies.set("token", response?.data?.token); 
        route.push("/dashboard"); 
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.error("Error details:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <form>
        <div className="w-full flex justify-center items-center">
          <label className="w-2/6 m-2 p-2">Username : </label>
          <input
            className=" w-4/6 m-2 p-2 border-2 border-gray-300 rounded-lg"
            type="text"
            placeholder="Enter Username"
            {...register("username", { required: "Username is required" })}
          />
        </div>
        {errors.username && (
          <span className="text-red-500 flex justify-center text-sm ml-4">
            Username is required
          </span>
        )}
        <div className="flex justify-center items-center">
          <label className="w-2/6 flex items-center justify-centerr  m-2 p-2">
            Password :
          </label>
          <div className="w-4/6 m-2 border-2 bg-white border-gray-300 rounded-lg flex items-center focus:border-2 ">
            <input
              className="w-full flex-1 px-4 p-2 rounded-lg focus:outline-none "
              type={visiblePw ? "text" : "password"}
              placeholder="Enter password"
              {...register("password", { required: "Password is required" })}
            />
            <span
              onClick={() => setVisiblePw((prev) => !prev)}
              className="cursor-pointer m-2"
            >
              {visiblePw ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>
        </div>
        {errors.password && (
          <span className="text-red-500 flex justify-center text-sm ml-4">
            Password is required
          </span>
        )}
      </form>
      <div className="flex justify-center items-center m-2">
        <button
          className="cursor-pointer bg-blue-500 p-2 m-2 rounded-lg text-white hover:text-black border-2 hover:bg-white hover:border-blue-500"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Login
        </button>
      </div>
      <div><p>Create new account ? <a href="/signup">Signup</a></p></div>
    </>
  );
};
export default LoginComponent;
