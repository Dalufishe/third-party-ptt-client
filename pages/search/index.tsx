import { useState } from "react";
import { Input } from "../../components/@/components/ui/input";
import { cn } from "../../components/@/lib/utils";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { NextPageWithLayout } from "../../components/layout/NextPageWithLayout";
import Searchbar from "../../components/pages/search-page/Searchbar/Searchbar";

const Page: NextPageWithLayout = () => {
  const [searching, setSearching] = useState(false);
  return (
    <div>
      <Searchbar />
    </div>
  );
};

Page.getLayout = function getLayout(page) {
  return (
    <DefaultLayout noNavbar noTabbar>
      {page}
    </DefaultLayout>
  );
};

export default Page;
