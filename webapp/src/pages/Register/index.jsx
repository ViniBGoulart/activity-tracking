import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import api from "../../services/api";

import "../../styles/globals.css";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm();

  const navigate = useNavigate();

  const onRegistry = async (data) => {
    try {
      const res = await api.post("api/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      });
      if (res.data.status) {
        const resLogin = await api.post("api/login", {
          email: data.email,
          password: data.password,
        });
        localStorage.setItem("token", resLogin.data.token);

        navigate("/home");
      }
    } catch (err) {
      alert("Error on Register, try again.");
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <form onSubmit={handleSubmit(onRegistry)}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="fullname"
              placeholder="Full Name"
              {...register("name")}
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              {...register("email")}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              {...register("password")}
            />
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirm_password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Create Account
            </button>
          </form>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => navigate('/login')}>
              Login
            </button>
          .
        </div>
      </div>
    </div>
  );
}
