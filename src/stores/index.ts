import { createContext, useContext } from "react";
import { ProductsStore } from "./products";
import { CategoriesStore } from "./categories";
import { BasketStore } from "./basket";

export class RootStore {
  productsStore: ProductsStore;
  categoriesStore: CategoriesStore;
  basketStore: BasketStore;

  constructor() {
    this.productsStore = new ProductsStore();
    this.categoriesStore = new CategoriesStore();
    this.basketStore = new BasketStore(this.productsStore);
  }
}

export const StoreContext = createContext<RootStore | null>(null);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === null) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
};
