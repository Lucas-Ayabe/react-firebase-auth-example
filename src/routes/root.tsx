import { Outlet } from "react-router-dom";
import { Layout } from "../components";

export const RootPage = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
