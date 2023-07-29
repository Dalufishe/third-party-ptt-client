import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import DefaultLayout from "../components/layout/DefaultLayout";
import { NextPageWithLayout } from "../components/layout/NextPageWithLayout";
import { AppProps } from "next/app";
import { store, wrapper } from "../redux/store";
import { Provider } from "react-redux";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return getLayout(
    <div className="dark">
      <Provider store={store}>
        <Component {...pageProps} />
        <Analytics />
      </Provider>
    </div>
  );
}

export default wrapper.withRedux(MyApp);
