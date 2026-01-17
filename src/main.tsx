import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { AppProviders } from "@/app/providers";
import { initMSW } from "@/app/providers/msw/init-msw";

async function main() {
  await initMSW();

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <AppProviders>
        <div></div>
      </AppProviders>
    </React.StrictMode>
  );
}

main();
