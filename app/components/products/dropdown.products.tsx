import { Button, Dropdown, MenuProps, Space } from "antd";
import ModalForm from "./modal-form.products";
import { Product } from "../../types";
import { MoreOutlined } from "@ant-design/icons";

interface Props {
  data?: Product;
  onSuccess: () => Promise<void>;
}

export default function ProductsDropdown({ data, onSuccess }: Props) {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <ModalForm type="edit" data={data} onSuccess={onSuccess} />,
    },
    {
      key: "2",
      label: <p>Delete</p>,
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <Button type="text" size="small" icon={<MoreOutlined />} />
    </Dropdown>
  );
}
