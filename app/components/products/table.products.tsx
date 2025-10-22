import { Product } from "@/app/types";
import { Table, type TableProps } from "antd";
import ProductsDropdown from "./dropdown.products";

interface Props {
  data: Product[];
  loading: boolean;
  onSuccess: () => Promise<void>;
}

export default function ProductsTable({ data, loading, onSuccess }: Props) {
  const columns: TableProps<Product>["columns"] = [
    {
      title: "Title",
      dataIndex: "product_title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "product_price",
      key: "price",
      render: (price: number) =>
        price.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
    },
    {
      title: "Category",
      dataIndex: "product_category",
      key: "category",
    },
    {
      title: "Description",
      dataIndex: "product_description",
      key: "description",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <ProductsDropdown data={record} onSuccess={onSuccess} />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={false}
    />
  );
}
