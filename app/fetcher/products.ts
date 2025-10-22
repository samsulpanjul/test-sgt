import axios from "axios";

export const getProducts = async (
  page: number,
  limit: number,
  search: string
) => {
  try {
    const response = await axios.get(`/api/products`, {
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
