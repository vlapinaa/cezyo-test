import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router";

import Container from "@/components/Container";
import { useStore } from "@/stores";
import { Product, ProductImage, ProductVariation } from "@/types";

const ProductPage = observer(() => {
  const { productsStore, basketStore } = useStore();
  const { id } = useParams();
  const [product, setProduct] = useState<
    Product & { images?: ProductImage[]; variations?: ProductVariation[] }
  >();

  useEffect(() => {
    if (!id) {
      return;
    }

    const productId = Number(id);

    if (productsStore.items[productId]) {
      const existingProduct = productsStore.items[productId];
      const existingImages = productsStore.images[productId];
      const existingVariations = productsStore.variations[productId];
      setProduct({
        ...existingProduct,
        images: existingImages,
        variations: existingVariations,
      });
    } else {
      productsStore.fetchItem(productId);
    }
  }, [productsStore, productsStore.items, id]);

  if (productsStore.error) {
    return (
      <Container>
        <div>Error: {productsStore.error}</div>
      </Container>
    );
  }

  const addToCart = () => {
    if (!product || basketStore.cart[product.id]) {
      return;
    }

    basketStore.add(product.id);
  };

  if (productsStore.isLoading || !product) {
    return (
      <Container>
        <div>Loading...</div>
      </Container>
    );
  }

  return (
    <>
      <Link className="block text-[#2967ff] text-sm mb-2" to="/">
        Назад
      </Link>

      <h1 className="text-xl md:text-3xl !leading-tight font-bold max-w-3xl mb-4">
        {product.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <figure className="w-full aspect-square mb-2">
            <img
              src={product.images?.[0].image_url}
              alt={product.name}
              className="object-cover w-full h-full rounded-sm"
            />
          </figure>
          <div className="flex items-center w-full overflow-x-auto space-x-2">
            {product.images?.slice(1).map((image) => (
              <figure className="w-24 h-24 shrink-0" key={image.id}>
                <img
                  className="object-cover w-full h-full rounded-sm"
                  src={image.image_url}
                />
              </figure>
            ))}
          </div>
        </div>
        <div>
          <div className="bg-[#f0f4fb] p-5 md:p-8 rounded-xl">
            <p className="space-x-1.5 mb-4">
              <span className="text-3xl font-medium">
                {product.variations?.[0].price}₽
              </span>
              <span>за шт.</span>
            </p>

            <button
              onClick={addToCart}
              className={`px-6 py-2 rounded-full cursor-pointer ${basketStore.cart[product.id] ? "bg-blue-200 text-blue-900" : "bg-[#2967ff] text-white"}`}
            >
              {basketStore.cart[product.id]
                ? "В корзине"
                : `В корзину за ${product.variations?.[0].price} руб.`}
            </button>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <p>{product.description}</p>
      </div>
    </>
  );
});

export default ProductPage;
