export interface Product {
  product_id: string;
  product_title: string;
  product_price: number;
  product_description?: string;
  product_image?: string;
  product_category?: string;
  created_timestamp: string;
  updated_timestamp: string;
}

export interface ProductListParams {
  page: number; // Current page number
  limit: number; // Items per page
  offset: number; // Calculate from page & limit
  search?: string; // Search term
}
