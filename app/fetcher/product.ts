import axios from "axios";
import { FieldType, Product } from "../types";

export const getProduct = async (productId: string = "") => {
  try {
    const response = await axios.get(`/api/product`, {
      params: {
        product_id: productId,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch product");
  }
};

export const postProduct = async (data: FieldType) => {
  try {
    const response = await axios.post("/api/product", data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to post product");
  }
};

export const putProduct = async (data: Product) => {
  try {
    const response = await axios.put("/api/product", data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to put product");
  }
};
