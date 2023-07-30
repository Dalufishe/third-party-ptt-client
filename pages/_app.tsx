import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import DefaultLayout from "../components/layout/DefaultLayout";
import { NextPageWithLayout } from "../components/layout/NextPageWithLayout";
import { AppProps } from "next/app";
import { persistor, store, wrapper } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Head from "next/head";
import { useRouter } from "next/router";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();

  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);
  return getLayout(
    <div className="dark">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="全新的 PTT 批踢踢第三方客戶端，快速、簡潔。"
        />
        <meta name="creator" content="Dalufishe" />
        <title>我の批踢踢</title>
        <meta property="og:title" content="我の批踢踢" />
        <meta
          property="og:description"
          content="全新的 PTT 批踢踢第三方客戶端，快速、簡潔。"
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_HOST}${
            process.env.NEXT_PUBLIC_PORT
              ? ":" + process.env.NEXT_PUBLIC_PORT
              : ""
          }${router.pathname}`}
        />
        <meta property="og:image" content="" />
        <meta property="og:type" content="website" />
      </Head>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Component {...pageProps} />
          <Analytics />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default wrapper.withRedux(MyApp);
