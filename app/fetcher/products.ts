import axios from "axios";
import { auth } from "../firebase/client";

export const getProducts = async (
  page: number,
  limit: number,
  search: string
) => {
  const token = await auth.currentUser?.getIdToken();

  try {
    const response = await axios.get(`/api/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        limit,
        search,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};
