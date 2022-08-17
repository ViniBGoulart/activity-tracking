import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { useForm } from "react-hook-form";

import api from "../../services/api";

import "../../styles/globals.css";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm();
  const history = useHistory("");

  const onLogin = async (data) => {
    try {
      const res = await api.post("api/login", {
        email: data.email,
        password: data.password,
      });
      console.log(res);
      localStorage.setItem("token", res.data.token);

      history.push("/home");
    } catch (err) {
      alert("Falha no login, tente novamente.");
    }
  };

  return (
    <div className="flex items-center justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit(onLogin)}
          className="bg-white shadow-md w-full rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
              type="text"
              {...register("email")}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="******************"
              type="password"
              {...register("password")}
            />
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              <Link className="back-link" to="/register">
                Register
              </Link>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
