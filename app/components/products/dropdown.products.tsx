import { Dropdown, MenuProps, Space } from "antd";
import ModalForm from "./modal-form.products";
import { Product } from "../../types";

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
    <div>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>Action</Space>
        </a>
      </Dropdown>
    </div>
  );
}
