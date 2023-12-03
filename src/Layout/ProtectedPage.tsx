import { Navigate, Outlet } from "react-router-dom";
import Layout from "./Layout";

const ProtectedPage = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};
export default ProtectedPage;
