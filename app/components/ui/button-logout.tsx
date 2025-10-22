"use client";

import { Button } from "antd";
import { useState } from "react";
import { useAuth } from "@/app/context/auth-context";
import { useRouter } from "next/navigation";

export default function ButtonLogout() {
  const { logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button type="default" danger loading={loading} onClick={handleLogout}>
      Logout
    </Button>
  );
}
