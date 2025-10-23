"use client";

import { ConfigProvider, theme } from "antd";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function AntdConfig({ children }: Props) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Cek system preference user
    const systemIsDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDark(systemIsDark);
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}
