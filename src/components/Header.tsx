import { Link } from "react-router";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";

const Search = ({ size = 24, color = "#000000" }) => (
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
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const ShoppingCart = ({ size = 24, color = "#000000" }) => (
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
    <circle cx="10" cy="20.5" r="1" />
    <circle cx="18" cy="20.5" r="1" />
    <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" />
  </svg>
);

const User = ({ size = 24, color = "#000000" }) => (
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
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const Header = observer(() => {
  const { basketStore } = useStore();
  return (
    <div className="w-full py-5">
      <>
        <div className="flex items-center">
          <Link to="/" className="text-4xl lg:text-5xl leading-none font-bold">
            React
          </Link>

          <Link
            to="/history"
            className="ml-auto lg:ml-8 text-gray-500 mr-4 leading-none"
          >
            История
            <span className="max-md:hidden"> заказов</span>
          </Link>

          <div className="max-lg:hidden flex items-center justify-between ml-auto p-0.5 rounded-full border-2 border-gray-100 w-full max-w-[400px] mr-4">
            <input
              className="px-3 w-full outline-none text-sm"
              placeholder="Поиск бренда, товара, категории..."
            />
            <button className="bg-[#f0f4fb] rounded-full px-6 py-2 shrink-0">
              <Search size={16} color="#000000" />
            </button>
          </div>

          <Link
            to="/basket"
            className="border-1 border-gray-200 rounded-full relative p-2 flex items-center justify-center mr-3"
          >
            <ShoppingCart size={16} color="#000000" />
            {basketStore.qnt > 0 && (
              <div className="absolute -top-2 -right-2 text-[12px] bg-white p-0.5 rounded-full font-semibold text-[#2967ff]">
                {basketStore.qnt}
              </div>
            )}
          </Link>

          <button className="border-1 border-gray-200 rounded-full relative p-2 flex items-center justify-center">
            <User size={16} color="#000000" />
          </button>
        </div>
      </>
    </div>
  );
});

export default Header;
