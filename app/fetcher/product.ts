import axios from "axios";
import { FieldType, Product } from "../types";
import { auth } from "../firebase/client";

export const getProduct = async (productId: string = "") => {
  const token = await auth.currentUser?.getIdToken();
  try {
    const response = await axios.get(`/api/product`, {
      headers: {
        Authorization: token,
      },
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
  const token = await auth.currentUser?.getIdToken();
  try {
    const response = await axios.post("/api/product", data, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to post product");
  }
};

export const putProduct = async (data: Product) => {
  const token = await auth.currentUser?.getIdToken();
  try {
    const response = await axios.put("/api/product", data, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to put product");
  }
};
