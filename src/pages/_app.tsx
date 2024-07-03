import type { AppProps } from "next/app";
import { useState } from "react";

//hooks
import { RecoilRoot } from "recoil";
import {
  dehydrate,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { JengaProvider } from "@/_ui/JengaProvider";

//style
import "@/styles/globals.css";

//components
import { ProtectedComponent } from "@/libs/view/ProtectedComponent";
import App from "@/libs/view/App";
import SessionComponent from "@/libs/view/SessionComponent";

//
export default function MyApp({ Component, pageProps }: AppProps) {
  const [client] = useState(() => new QueryClient());
  const dehydratedState = dehydrate(client);

  return (
    <QueryClientProvider client={client}>
      <Hydrate state={dehydratedState}>
        <RecoilRoot>
          <JengaProvider>
            <App>
              {(Component as any).auth ? (
                <SessionComponent>
                  <ProtectedComponent>
                    <Component {...pageProps} />
                  </ProtectedComponent>
                </SessionComponent>
              ) : (
                <Component {...pageProps} />
              )}
            </App>
          </JengaProvider>
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
}
