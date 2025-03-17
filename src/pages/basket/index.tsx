import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import { useState } from "react";
import { useNavigate } from "react-router";

const Trash = ({ size = 24, color = "#000000" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const Basket = observer(() => {
  const { basketStore, productsStore } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const submitOrder = () => {
    setIsModalOpen(false);
    basketStore.clean();
    navigate("/");
  };

  return (
    <div className="w-full">
      <div className="flex items-center space-x-4 md:space-x-8 mb-6">
        <h1 className="text-2xl leading-tight font-semibold">Корзина</h1>
        {basketStore.qnt > 0 && (
          <button
            onClick={basketStore.clean}
            className="text-red-500 text-xs md:text-sm leading-tight cursor-pointer font-medium"
          >
            Очистить корзину
          </button>
        )}
      </div>

      {basketStore.qnt === 0 && <div>Корзина пуста(((</div>}

      {basketStore.qnt > 0 && (
        <div className="border-2 border-gray-100 rounded-2xl">
          <div className="border-b-2 border-gray-100 rounded-2xl flex max-md:flex-col max-md:space-y-1.5 items-start justify-between py-4 px-6 md:px-10">
            <div className="text-xl font-medium">Xiaomi</div>
            <div>
              <p>Стоимость корзины</p>
              <p className="font-semibold text-lg">
                {basketStore.totalPrice} руб.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 md:px-12 py-1 md:py-3 bg-blue-500 cursor-pointer text-white rounded-full"
            >
              Оформить
            </button>
          </div>
          <div className="py-1 px-6 md:px-10">
            {Object.entries(basketStore.cart).map(([id, qnt]) => (
              <div
                className="border-b-2 last:border-b-0 border-gray-100 py-6 grid grid-cols-3 md:grid-cols-7 items-center gap-4"
                key={id}
              >
                <div className="w-12 md:w-20 h-12 md:h-20">
                  <img
                    className="w-full h-full rounded-lg"
                    src={productsStore.images[Number(id)]?.[0].image_url}
                  />
                </div>
                <div className="col-span-2 md:col-span-3 leading-tight line-clamp-3 md:line-clamp-1 max-md:text-xs">
                  {productsStore.items[Number(id)]?.name}
                </div>
                <div>
                  <div className="border rounded-full border-gray-100 py-1 px-3 flex items-center justify-center w-fit space-x-3">
                    <button
                      onClick={() => basketStore.decrement(Number(id))}
                      className="cursor-pointer"
                    >
                      -
                    </button>
                    <div>{qnt}</div>
                    <button
                      onClick={() => basketStore.increment(Number(id))}
                      className="cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex justify-end">
                  {basketStore.cart[Number(id)] *
                    productsStore.variations[Number(id)]?.[0].price}{" "}
                  руб.
                </div>
                <div className="flex justify-end">
                  <button
                    className="cursor-pointer h-fit p-1"
                    onClick={() => basketStore.remove(Number(id))}
                  >
                    <Trash size={16} color="#000000" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed z-39 top-0 left-0 flex items-center justify-center w-full h-full">
          <div className="fixed top-0 left-0 w-full h-screen bg-gray-800 opacity-50 z-40"></div>
          <div className="bg-white z-41 w-full max-w-md rounded-2xl p-4 shadow-sm">
            <p className="text-2xl font-semibold mb-2">Оформить заказ?</p>
            <p className="mb-4">Оформить заказ?</p>
            <button
              onClick={submitOrder}
              className="px-12 cursor-pointer py-3 bg-blue-500 text-white w-full rounded-full"
            >
              Оформить заказ
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default Basket;
