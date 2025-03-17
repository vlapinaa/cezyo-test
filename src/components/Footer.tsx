import { Link } from "react-router";
import Container from "@/components/Container";

const Footer = () => {
  return (
    <div className="w-full bg-gray-100 py-10">
      <Container>
        <div className="w-full flex flex-col lg:flex-row items-start mb-10">
          <Link
            to="/"
            className="text-4xl leading-none font-bold max-lg:mb-4 lg:mr-8"
          >
            React
          </Link>

          <div className="max-lg:mb-4 lg:ml-auto">
            <p className="font-light mb-2">Присоединяйтесь к нам</p>
            <div className="flex items-center space-x-2 text-sm">
              {["FB", "VK", "IG"].map((icon) => (
                <div
                  key={icon}
                  className="h-8 w-8 bg-blue-500 text-white rounded-sm flex items-center justify-center"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:ml-8">
            <p className="font-light mb-2">Устанавливайте приложение</p>
            <div className="flex items-center space-x-2 text-sm">
              {["Google Play", "App Store"].map((icon) => (
                <div
                  key={icon}
                  className="py-2 px-6 text-center bg-zinc-900 text-white rounded-lg"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full text-gray-400 text-sm flex flex-col lg:flex-row lg:items-center justify-center max-lg:space-y-1 lg:space-x-8">
          <p>© Sionic</p>
          <p>Правовая информация</p>
          <p>Политика конфиденциальности</p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
