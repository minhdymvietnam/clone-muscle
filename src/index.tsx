import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import Layout from "./components/layout";
import LandingPage from "./screens";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Layout>
      <LandingPage />
    </Layout>
  </StrictMode>,
);
