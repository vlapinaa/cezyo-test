import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "@/stores";

import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";

const ITEMS_PER_PAGE = 12;

const Products = observer(() => {
  const { productsStore, categoriesStore } = useStore();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (productsStore.isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [productsStore.isLoading, hasMore],
  );

  useEffect(() => {
    productsStore.fetchItems(0, ITEMS_PER_PAGE);
    categoriesStore.fetchCategories();
    setPage(1);
    setHasMore(true);
  }, [productsStore, categoriesStore]);

  useEffect(() => {
    if (page > 1) {
      productsStore
        .fetchItems(
          (page - 1) * ITEMS_PER_PAGE,
          page * ITEMS_PER_PAGE,
          selectedCategoryId || undefined,
        )
        .then((newItems) => {
          if (!newItems || newItems.length < ITEMS_PER_PAGE) {
            setHasMore(false);
          }
        });
    }
  }, [page, selectedCategoryId, productsStore]);

  if (productsStore.error) {
    return (
      <Container>
        <div>Error: {productsStore.error}</div>
      </Container>
    );
  }

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold mb-3">Категории товаров</h2>
        <div className="flex w-full overflow-x-auto md:flex-wrap mb-4">
          {[
            { id: null, name: "Все товары", parent_id: -1 },
            ...categoriesStore.categories,
          ].map((category) => (
            <button
              className="bg-pink-400 shrink-0 text-white rounded-full cursor-pointer text-sm py-1 px-4 mb-1 mr-1"
              key={category.id}
              onClick={() => setSelectedCategoryId(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {Object.values(productsStore.items).map((item, index) => (
          <div
            key={item.id}
            ref={
              index === Object.values(productsStore.items).length - 1
                ? lastProductElementRef
                : null
            }
          >
            <ProductCard
              data={item}
              images={productsStore.images[item.id]}
              variations={productsStore.variations[item.id]}
            />
          </div>
        ))}
        {productsStore.isLoading &&
          [1, 2, 3, 4].map((i) => (
            <div
              key={`skeleton-${i}`}
              className="w-full h-48 bg-gray-100 rounded-md"
            />
          ))}
      </div>
    </>
  );
});

export default Products;
