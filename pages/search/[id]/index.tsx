import DefaultLayout from "../../../components/layout/DefaultLayout";
import { NextPageWithLayout } from "../../../components/layout/NextPageWithLayout";
import Navbar from "../../../components/pages/search-id-page/Navbar";
import { useRouter } from "next/router";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  return (
    <div>
      <Navbar>「{router.query.id}」的搜尋結果：</Navbar>
    </div>
  );
};

Page.getLayout = function getLayout(page) {
  return <DefaultLayout noNavbar>{page}</DefaultLayout>;
};

export default Page;
