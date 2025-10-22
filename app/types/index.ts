export interface Product extends FieldType {
  product_id: string;
  created_timestamp: string;
  updated_timestamp: string;
}

export interface FieldType {
  product_title: string;
  product_price: number;
  product_description?: string;
  product_category?: string;
  product_image?: string;
}

export interface ProductListParams {
  page: number; // Current page number
  limit: number; // Items per page
  offset: number; // Calculate from page & limit
  search?: string; // Search term
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  search?: null | string;
}

export interface ProductListResponse {
  status_code: string;
  is_success: boolean;
  error_code: null | string;
  data: Product[] | [];
  pagination: Pagination;
}
