import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { Provider } from "react-redux";
import store from "./libs/redux/index.ts";
import { I18nextProvider } from "react-i18next";
import lang from "./libs/lang/lang.ts";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<h1></h1>}>
          <Provider store={store}>
            <I18nextProvider i18n={lang}>
              <App />
            </I18nextProvider>
          </Provider>
        </Suspense>
        {/* <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" /> */}
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
