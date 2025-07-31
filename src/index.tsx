import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import Layout from "./components/layout";
import LandingPage from "./screens";
import { usePerformanceMonitor } from "./hooks/usePerformanceMonitor";

function App() {
  usePerformanceMonitor();
  
  return (
    <Layout>
      <LandingPage />
    </Layout>
  );
}

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
