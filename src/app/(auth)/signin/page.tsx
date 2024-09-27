"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (response?.error) {
      setError(response.error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center m-10">
      <h1 className="text-4xl font-bold mb-4 text-stone-700 font-serif">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded-full p-2"
          />
        </div>
        {error && <p className="text-red-800">{error}</p>}
        <button
          type="submit"
          className="w-full border rounded-full p-2 bg-stone-800 text-white hover:bg-stone-600"
        >
          Sign in
        </button>
        <Link
          href="/signup"
          className="block mt-4 text-stone-400 hover:underline text-center"
        >
          Visit Sign Up page
        </Link>
      </form>
    </div>
  );
}
