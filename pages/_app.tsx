import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import DefaultLayout from "../components/layout/DefaultLayout";
import { NextPageWithLayout } from "../components/layout/NextPageWithLayout";
import { AppProps } from "next/app";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
  Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return getLayout(
    <div className="dark">
        <Component {...pageProps} />
        <Analytics />
    </div>
  );
}

export default MyApp;
