import Header from "./Header";
import Footer from "./Footer";
import Container from "@/components/Container";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Container>
      <div className="flex max-w-8xl mx-auto">
        <div className="w-full">
          <Header />
          <main className="pt-2 md:pt-4 pb-12">{children}</main>
        </div>

        <div className="max-lg:hidden ml-4 pl-2 pt-5 pr-6 border-l-2 border-gray-100 shrink-0 w-[250px]">
          <div className="border border-pink-500 rounded-2xl p-2 sticky top-3">
            <p className="text-[#2967ff] text-xl leading-tight mb-3">
              💕 Получай товары <span className="uppercase">бесплатно</span>
            </p>
            <button className="bg-[#2967ff] text-white py-1.5  px-4 text-center rounded-full">
              Узнать подробнее
            </button>
          </div>
        </div>

        <div className="lg:hidden bg-pink-400 rounded-2xl p-3 text-xs fixed right-3 bottom-2">
          <p className="text-white font-semibold leading-tight mb-2">
            Получай товары <span className="uppercase">бесплатно</span>
          </p>
          <button className="bg-white text-pink-400 py-1 px-2 text-center rounded-full">
            Узнать подробнее
          </button>
        </div>
      </div>
    </Container>

    <Footer />
  </>
);

export default Layout;
