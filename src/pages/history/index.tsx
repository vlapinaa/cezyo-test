import { Link } from "react-router";

const History = () => {
  const order = {
    title: "Заказ",
    date: "15.03.2025",
    status: "Оплачен",
    number: "1234567890",
    qnt: 5,
    price: 123456,
    address: "Москва, ул. Пушкина, д. 12",
  };

  return (
    <div className="w-full grid md:grid-cols-2 gap-4">
      {[order, order].map((order, index) => (
        <div
          className="border-2 border-gray-100 rounded-2xl text-xs p-6"
          key={index}
        >
          <p className="text-2xl mb-1">{order.title}</p>
          <div className="flex items-center space-x-4 mb-3">
            <span>{order.date}</span>
            <Link className="text-[#2967ff]" to={`/history/${order.number}`}>
              Подробнее
            </Link>
          </div>

          <div className="flex space-x-4 mb-3">
            <div>
              <p className="text-gray-400 leading-none mb-1">Статус заказа</p>
              <p>{order.status}</p>
            </div>
            <div>
              <p className="text-gray-400 leading-none mb-1">Номер заказа</p>
              <p>{order.number}</p>
            </div>
          </div>

          <div className="flex space-x-4">
            <div>
              <p className="text-gray-400 leading-none mb-1">Кол-во товаров</p>
              <p>{order.qnt}</p>
            </div>
            <div>
              <p className="text-gray-400 leading-none mb-1">
                Стоимость заказа
              </p>
              <p>{order.price} руб.</p>
            </div>
            <div>
              <p className="text-gray-400 leading-none mb-1">Адрес доставки</p>
              <p>{order.address}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
