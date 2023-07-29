import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import DefaultLayout from "../components/layout/DefaultLayout";
import { NextPageWithLayout } from "../components/layout/NextPageWithLayout";
import { AppProps } from "next/app";
import { persistor, store, wrapper } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return getLayout(
    <div className="dark">
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
