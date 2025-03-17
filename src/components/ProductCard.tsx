import { Link } from "react-router";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import { Product, ProductImage, ProductVariation } from "@/types";

interface Props {
  data: Product;
  images?: ProductImage[];
  variations?: ProductVariation[];
}
const ProductCard = observer(({ data, images, variations }: Props) => {
  const { basketStore } = useStore();

  const image = images?.[0];
  const variation = variations?.[0];

  const addToCart = () => {
    if (basketStore.cart[data.id]) {
      return;
    }

    basketStore.cart[data.id] = basketStore.cart[data.id] + 1 || 1;
  };

  return (
    <div className="flex flex-col">
      <Link to={`/products/${data.id}`} className="flex flex-col grow mb-3">
        <figure className="w-full h-64 mb-3">
          <img
            src={image?.image_url}
            className="w-full h-full object-cover rounded-xl shadow-sm"
          />
        </figure>

        <p className="text-base line-clamp-2 leading-tight mb-2">{data.name}</p>
        <p className="text-2xl font-medium text-blue-500 mt-auto">
          {variation?.price} руб.
        </p>
      </Link>

      <button
        onClick={addToCart}
        className={`px-6 py-2 rounded-full cursor-pointer border ${basketStore.cart[data.id] ? "bg-blue-500 text-white" : "border-blue-500 text-blue-500"}`}
      >
        {basketStore.cart[data.id] ? "В корзине" : "Добавить в корзину"}
      </button>
    </div>
  );
});

export default ProductCard;
