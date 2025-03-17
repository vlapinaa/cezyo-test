import { makeAutoObservable, runInAction } from "mobx";
import { getCategories } from "@/services/api/categories";

import { Category } from "@/types";

export class CategoriesStore {
  categories: Category[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchCategories() {
    this.loading = true;
    this.error = null;
    try {
      const categories = await getCategories();
      runInAction(() => {
        this.categories = categories;
        this.loading = false;
      });
    } catch {
      runInAction(() => {
        this.error = "Ошибка при загрузке категорий";
        this.loading = false;
      });
    }
  }
}
