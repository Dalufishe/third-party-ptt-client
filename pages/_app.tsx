import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import DefaultLayout from "../components/layout/DefaultLayout";
import { NextPageWithLayout } from "../components/layout/NextPageWithLayout";
import { AppProps } from "next/app";
import { persistor, store, wrapper } from "../redux/store";
import { Provider } from "react-redux";
import Head from "next/head";
import { useRouter } from "next/router";
import getSiteURL from "../utils/getSiteURL";
import { useEffect, useState } from "react";
import { PersistGate } from "redux-persist/integration/react";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const [isClientSide, setIsClientSide] = useState(false);
  useEffect(() => {
    setIsClientSide(true);
  }, []);
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);
  return getLayout(
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta
          name="description"
          content="全新的 PTT 批踢踢第三方客戶端，快速、簡潔。"
        />
        <meta name="creator" content="Dalufishe" />
        <title>我の批踢踢</title>
        <meta property="og:title" content="我の批踢踢" key="title" />
        <meta
          property="og:description"
          content="全新的 PTT 批踢踢第三方客戶端，快速、簡潔。"
          key="description"
        />
        <meta property="og:url" content={getSiteURL()} key="url" />
        <meta property="og:image" content="" />
        <meta property="og:type" content="website" />
      </Head>
      {isClientSide ? (
        <PersistGate persistor={persistor}>
          <Provider store={store}>
            <Component {...pageProps} />
            <Analytics />
          </Provider>
        </PersistGate>
      ) : (
        <Provider store={store}>
          <Component {...pageProps} />
          <Analytics />
        </Provider>
      )}
    </>
  );
}

export default wrapper.withRedux(MyApp);
