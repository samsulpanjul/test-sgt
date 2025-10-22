"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/app/firebase/client";
import { useRouter } from "next/navigation";
import { Input, Button, message } from "antd";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await signOut(auth);
      message.success("Account created successfully!");
      router.push("/auth/login");
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        message.error("Email is already in use");
      } else if (err.code === "auth/invalid-email") {
        message.error("Invalid email address");
      } else if (err.code === "auth/weak-password") {
        message.error("Password is too weak");
      } else {
        message.error("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <>
      <p className="text-4xl font-semibold">Register</p>
      <Input
        placeholder="Email"
        value={email}
        size="large"
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <Input.Password
        placeholder="Password"
        value={password}
        size="large"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="primary"
        size="large"
        onClick={handleRegister}
        loading={loading}
        onKeyDown={handleKeyPress}
      >
        Register
      </Button>
      <p className="text-sm mt-2">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="text-blue-500 hover:text-blue-700 hover:underline"
        >
          Login
        </Link>
      </p>
    </>
  );
}
