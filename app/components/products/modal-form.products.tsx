import React, { useState } from "react";
import { Button, Modal } from "antd";
import FormField from "./form-field.products";
import { Product } from "../../types";

interface Props {
  type: "create" | "edit";
  data?: Product;
  onSuccess: () => Promise<void>;
}

export default function ModalForm({ type, data, onSuccess }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      {type === "create" ? (
        <Button onClick={showModal}>Add Product</Button>
      ) : (
        <div onClick={showModal}>Edit</div>
      )}
      <Modal
        title={type === "create" ? "Add Product" : "Edit Product"}
        open={open}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        footer={null}
      >
        <FormField
          data={data}
          setOpen={setOpen}
          setConfirmLoading={setConfirmLoading}
          onSuccess={onSuccess}
        />
      </Modal>
    </>
  );
}
