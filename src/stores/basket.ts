import { makeAutoObservable } from "mobx";
import { ProductsStore } from "./products";

export class BasketStore {
  cart: Record<number, number> = {};
  productsStore: ProductsStore;

  constructor(productsStore: ProductsStore) {
    this.productsStore = productsStore;
    makeAutoObservable(this);
  }

  get qnt() {
    return Object.values(this.cart).reduce((acc, qnt) => acc + qnt, 0);
  }

  get totalPrice() {
    return Object.entries(this.cart)
      .map(
        ([id, qnt]) =>
          qnt * this.productsStore.variations[Number(id)]?.[0].price || 0,
      )
      .reduce((acc, price) => acc + price, 0);
  }

  remove = (id: number) => {
    delete this.cart[id];
  };

  add = (id: number) => {
    this.cart[id] = 1;
  };

  increment = (id: number) => {
    if (this.cart[id]) {
      const maxStock = this.productsStore.variations[Number(id)]?.[0].stock;
      if (this.cart[id] >= maxStock) {
        return;
      }
    }

    this.cart[id] = (this.cart[id] || 0) + 1;
  };

  decrement = (id: number) => {
    if (this.cart[id] === 1) {
      this.remove(id);
    } else {
      if (this.cart[id] > 0) {
        this.cart[id]--;
      }
    }
  };

  clean = () => {
    this.cart = {};
  };
}
