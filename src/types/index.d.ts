export interface Product {
  id: number;
  name: string;
  description: string;
  category_id: number;
}

export interface ProductImage {
  id: number;
  image_name: string;
  image_url: string;
  product_id: number;
}

export interface ProductVariation {
  id: number;
  stock: number;
  price: number;
  product_id: number;
}

export interface Category {
  id: number;
  name: string;
  parent_id: number;
}
