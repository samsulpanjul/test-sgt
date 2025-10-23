"use client";

import { useEffect, useState } from "react";
import { Input, Pagination, Space, message, Typography } from "antd";
import ModalForm from "./products/modal-form.products";
import useDebounce from "../hooks/useDebounce";
import { getProducts } from "../fetcher/products";
import ProductsTable from "./products/table.products";
import ButtonLogout from "./ui/button-logout";
import { useAuth } from "../context/auth-context";
import type { Product, ProductListResponse } from "../types";

export default function ProductsSection() {
  const { user, initializing } = useAuth();

  const [data, setData] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const debouncedSearch = useDebounce(search, 300);

  const fetchData = async (page = 1, limit = 10, search = "") => {
    setLoading(true);
    try {
      const result: ProductListResponse = await getProducts(
        page,
        limit,
        search
      );
      if (!Array.isArray(result.data)) {
        if (
          typeof result.data === "string" &&
          result.data.includes("Firebase ID token")
        ) {
          message.error(result.data);
          return;
        }
      } else {
        setData(result.data);
        setTotal(result.pagination.total);
      }
    } catch (error: any) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initializing && user) {
      fetchData(page, limit, debouncedSearch);
    }
  }, [initializing, user, page, limit, debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{ width: "100%", marginTop: "6rem", marginBottom: "6rem" }}
    >
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <Space>
          <ModalForm
            type="create"
            onSuccess={() => fetchData(page, limit, debouncedSearch)}
          />
          <Input.Search
            placeholder="Search Product"
            style={{ width: "12rem" }}
            value={search}
            onChange={handleChange}
          />
        </Space>
        <Space size={"large"}>
          <Typography.Text strong style={{ fontSize: "1.2rem" }}>
            {user?.email}
          </Typography.Text>
          <ButtonLogout />
        </Space>
      </Space>

      <ProductsTable
        data={data}
        loading={loading}
        onSuccess={() => fetchData(page, limit, debouncedSearch)}
      />

      <Space style={{ width: "100%", justifyContent: "center" }}>
        <Pagination
          current={page}
          total={total}
          pageSize={limit}
          showSizeChanger
          onChange={(p, l) => {
            setPage(p);
            setLimit(l);
          }}
        />
      </Space>
    </Space>
  );
}
