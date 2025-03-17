import api from "@/services/axios";

import { Product, ProductImage, ProductVariation } from "@/types";

export const getProducts = async (
  start: number = 0,
  end: number = 24,
  categoryId?: number,
) => {
  let url = `/Products?range=[${start},${end}]`;

  if (categoryId) {
    url += `&filter={"category_id":${categoryId}}`;
  }

  const { data } = await api.get<Product[]>(url);
  return data;
};

export const getProduct = async (id: number) => {
  const { data } = await api.get<Product>(`/Products/${id}`);
  return data;
};

export const getProductImages = async (ids: number[]) => {
  const { data } = await api.get<ProductImage[]>(
    `/ProductImages?filter={"product_id":[${ids.join(",")}]}`,
  );
  return data;
};

export const getProductVariations = async (ids: number[]) => {
  const { data } = await api.get<ProductVariation[]>(
    `/ProductVariations?filter={"product_id":[${ids.join(",")}]}`,
  );
  return data;
};
