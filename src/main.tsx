import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "@/assets/styles/index.css";

import { RootStore, StoreContext } from "@/stores";

import Layout from "@/components/Layout";
import AppRoutes from "@/routes";

const rootStore = new RootStore();

createRoot(document.getElementById("root")!).render(
  <StoreContext.Provider value={rootStore}>
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  </StoreContext.Provider>,
);
