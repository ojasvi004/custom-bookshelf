"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import Link from "next/link";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) {
      return;
    }
    try {
      const response = await axios.post("/api/sign-up", {
        username,
        email,
        password,
      });
      if (response.status === 201) {
        console.log("registration successful", response);
        router.push("/dashboard");

      }
    } catch (error) {
      console.log("failed to create user", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-4xl font-bold mb-4 text-stone-700 font-serif">
        Create Account
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username:</label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password:</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-full p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full border rounded-full p-2 bg-stone-800 text-white hover:bg-stone-600"
        >
          Create Account
        </button>
        <Link
          href="/signin"
          className="block mt-4 text-stone-400 hover:underline text-center"
        >
          Visit Sign in page
        </Link>
      </form>
    </div>
  );
};

export default Signup;
