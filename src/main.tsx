import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { initMSW } from "@/app/providers/msw/init-msw";
import { AppProviders } from "@/app/providers";

async function main() {
    await initMSW();

    ReactDOM.createRoot(document.getElementById("root")!).render(
        <React.StrictMode>
            <AppProviders />
        </React.StrictMode>,
    );
}

main();
