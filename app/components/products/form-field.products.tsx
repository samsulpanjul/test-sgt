import {
  Form,
  Input,
  InputNumber,
  FormProps,
  Button,
  InputNumberProps,
} from "antd";
import { FieldType, Product } from "../../types";
import { useEffect } from "react";
import { postProduct, putProduct } from "../../fetcher/product";

interface Props {
  data?: Product;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: () => Promise<void>;
}

export default function FormField({
  data,
  setOpen,
  setConfirmLoading,
  onSuccess,
}: Props) {
  const [form] = Form.useForm<FieldType>();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      setConfirmLoading(true);
      data ? handleUpdateProduct(values) : handleAddProduct(values);
      await onSuccess?.();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setOpen(false);
      form.resetFields();
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handleAddProduct = async (values: FieldType) => {
    try {
      const res = await postProduct(values);
      console.log("Successfully added product:", res);
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleUpdateProduct = async (values: FieldType) => {
    try {
      const res = await putProduct({
        ...values,
        product_id: data?.product_id as string,
        created_timestamp: data?.created_timestamp as string,
        updated_timestamp: data?.updated_timestamp as string,
      });
      console.log("Successfully updated product:", res);
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setConfirmLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        product_title: data.product_title,
        product_price: data.product_price,
        product_description: data.product_description,
        product_category: data.product_category,
        product_image: data.product_image,
      });
    } else {
      form.resetFields();
    }
  }, [data, form]);

  const formatter: InputNumberProps<number>["formatter"] = (value) => {
    const [start, end] = `${value}`.split(".") || [];
    const v = `${start}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `$ ${end ? `${v}.${end}` : `${v}`}`;
  };

  return (
    <Form
      form={form}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Title"
        name="product_title"
        rules={[{ required: true, message: "Please input product title!" }]}
      >
        <Input placeholder="Product Title..." />
      </Form.Item>
      <Form.Item
        label="Price"
        name="product_price"
        rules={[{ required: true, message: "Please input product price!" }]}
      >
        <InputNumber
          min={0}
          formatter={formatter}
          parser={(value) =>
            value?.replace(/\$\s?|(,*)/g, "") as unknown as number
          }
          placeholder="Price..."
        />
      </Form.Item>
      <Form.Item
        layout="vertical"
        label="Description"
        name="product_description"
      >
        <Input.TextArea placeholder="Description..." />
      </Form.Item>
      <Form.Item label="Category" name="product_category">
        <Input placeholder="Category..." />
      </Form.Item>
      <Form.Item label="Image URL" name="product_image">
        <Input placeholder="Image URL..." />
      </Form.Item>
      <Form.Item>
        <div className="flex justify-end">
          <Button type="primary" htmlType="submit">
            {data ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}
