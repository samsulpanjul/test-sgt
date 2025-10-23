"use client";

import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/client";
import { useRouter } from "next/navigation";
import { Input, Button, message } from "antd";
import Link from "next/link";
import { useAuth } from "@/app/context/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, initializing } = useAuth();

  useEffect(() => {
    if (!initializing && user) {
      router.push("/products");
    }
  }, [user, initializing, router]);

  const handleLogin = async () => {
    if (!email || !password) {
      message.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const token = await userCredential.user.getIdToken();

      const expires = new Date(Date.now() + 60 * 60 * 1000);
      document.cookie = `token=${token}; path=/; expires=${expires.toUTCString()}; secure; samesite=lax`;

      message.success("Login success");

      setTimeout(() => {
        router.push("/products");
      }, 100);
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.code === "auth/invalid-credential") {
        message.error("Invalid email or password");
      } else if (err.code === "auth/too-many-requests") {
        message.error("Too many attempts. Please try again later.");
      } else {
        message.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-80 mx-auto border p-6">
      <p className="text-4xl font-semibold">Login</p>
      <div className="space-y-4">
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyPress}
          size="large"
        />
        <Input.Password
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}
          size="large"
        />
        <Button
          type="primary"
          onClick={handleLogin}
          loading={loading}
          size="large"
          block
        >
          Login
        </Button>
      </div>

      <p className="text-sm mt-2">
        Doesn't have an account?{" "}
        <Link
          href="/auth/register"
          className="text-blue-500 hover:text-blue-700 hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
