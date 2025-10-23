"use client";

import { useEffect, useState } from "react";
import { Input, Pagination, message } from "antd";
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
    <div className="space-y-4 mt-8 mb-24">
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <ModalForm
            type="create"
            onSuccess={() => fetchData(page, limit, debouncedSearch)}
          />
          <Input
            placeholder="Search Product"
            style={{ width: "12rem" }}
            value={search}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-4">
          <p>{user?.email}</p>
          <ButtonLogout />
        </div>
      </div>

      <ProductsTable
        data={data}
        loading={loading}
        onSuccess={() => fetchData(page, limit, debouncedSearch)}
      />

      <div className="w-full flex justify-center">
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
      </div>
    </div>
  );
}
