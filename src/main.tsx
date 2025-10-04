import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/sonner.tsx";
import TanstackProvider from "@/providers/tanstack.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanstackProvider>
      <App />
      <Toaster position="top-right" richColors />
    </TanstackProvider>
  </StrictMode>
);
