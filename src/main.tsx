import React from "react";
import ReactDOM from "react-dom/client";
//import App from "./App";
import "./index.css";

import { AppProviders } from "@/app/providers";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AppProviders>
            <div></div>
        </AppProviders>
    </React.StrictMode>,
);
