import { makeAutoObservable, runInAction } from "mobx";
import {
  getProducts,
  getProductImages,
  getProductVariations,
  getProduct,
} from "@/services/api/products";

import { Product, ProductImage, ProductVariation } from "@/types";

export class ProductsStore {
  items: { [key: number]: Product } = {};
  images: { [key: number]: ProductImage[] } = {};
  variations: { [key: number]: ProductVariation[] } = {};

  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchItems(start: number = 0, end: number = 24, categoryId?: number) {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await getProducts(start, end, categoryId);
      const newProducts = response.reduce(
        (acc, item) => {
          acc[item.id] = item;
          return acc;
        },
        {} as { [key: number]: Product },
      );
      runInAction(() => {
        this.items = { ...this.items, ...newProducts };
        this.isLoading = false;
      });

      this.fetchItemsImages(response.map((item) => item.id));
      this.fetchItemsVariations(response.map((item) => item.id));
      return response;
    } catch {
      runInAction(() => {
        this.error = "Ошибка при загрузке товаров";
        this.isLoading = false;
      });
    }
  }

  async fetchItem(id: number) {
    this.isLoading = true;
    this.error = null;
    try {
      const product = await getProduct(id);
      runInAction(() => {
        this.items = { ...this.items, [id]: product };
        this.isLoading = false;
      });

      this.fetchItemsImages([product.id]);
      this.fetchItemsVariations([product.id]);
    } catch {
      runInAction(() => {
        this.error = "Ошибка при загрузке товара";
        this.isLoading = false;
      });
    }
  }

  async fetchItemsImages(items: number[]) {
    const images = await getProductImages(items);
    runInAction(() => {
      images.map((image) => {
        this.images[image.product_id] = this.images[image.product_id] || [];
        this.images[image.product_id].push(image);
      });
    });
  }

  async fetchItemsVariations(items: number[]) {
    const variations = await getProductVariations(items);
    runInAction(() => {
      variations.map((variation) => {
        this.variations[variation.product_id] =
          this.variations[variation.product_id] || [];
        this.variations[variation.product_id].push(variation);
      });
    });
  }
}
