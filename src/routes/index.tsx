import { Routes, Route } from "react-router";

import ProductsPage from "@/pages/products";
import ProductIdPage from "@/pages/products/[id]";
import HistoryPage from "@/pages/history";
import HistoryIdPage from "@/pages/history/[id]";
import BasketPage from "@/pages/basket";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<ProductsPage />} />
    <Route path="/products/:id" element={<ProductIdPage />} />
    <Route path="/history" element={<HistoryPage />} />
    <Route path="/history/:id" element={<HistoryIdPage />} />
    <Route path="/basket" element={<BasketPage />} />
  </Routes>
);

export default AppRoutes;
