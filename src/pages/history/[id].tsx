import { Link } from "react-router";

const HistoryId = () => {
  const item = {
    title: "Товар",
    price: 12345,
    quantity: 2,
  };

  return (
    <>
      <Link className="block text-[#2967ff] text-sm mb-2" to="/history">
        Назад
      </Link>

      <h1 className="text-2xl font-semibold max-w-3xl mb-4">Заказ 123455</h1>
      <h2 className="text-xl font-semibold max-w-3xl mb-2">Товары</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {[1, 2, 3, 4, 5].map((i) => (
          <div className="border-b-2 border-gray-300 py-2" key={i}>
            <p className="font-medium text-gray-500 mb-1">{item.title}</p>
            <div className="flex items-center justify-between text-sm">
              <span>{item.price} руб./шт.</span>
              <span>{item.quantity} шт.</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HistoryId;
