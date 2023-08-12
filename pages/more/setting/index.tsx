import DefaultLayout from "../../../components/layout/DefaultLayout";
import { NextPageWithLayout } from "../../../components/layout/NextPageWithLayout";
import Navbar from "../../../components/pages/more-page/Navbar/Navbar";

const Page: NextPageWithLayout= () => {
  return (
    <div>
      <Navbar>設置</Navbar>
      
    </div>
  );
};

Page.getLayout = function getLayout(page) {
  return <DefaultLayout noNavbar>{page}</DefaultLayout>;
};

export default Page;
