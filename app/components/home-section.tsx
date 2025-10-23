"use client";
import Link from "next/link";
import { Button, Space, Typography } from "antd";

export default function HomeSection() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Space direction="vertical" align="center">
        <Typography.Title>Take Home Test</Typography.Title>
        <Typography.Text>Simple product management</Typography.Text>
        <Space style={{ marginTop: 24 }}>
          <Link href="/auth/login">
            <Button color="blue" variant="solid" size="large">
              Login
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button size="large">Register</Button>
          </Link>
        </Space>
      </Space>
    </div>
  );
}
