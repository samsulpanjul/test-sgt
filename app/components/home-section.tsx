"use client";
import Link from "next/link";

export default function HomeSection() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Take Home Test</h1>
        <p className="mb-8">Simple product management</p>
        <div className="space-x-4">
          <Link
            href="/auth/login"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-50"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
