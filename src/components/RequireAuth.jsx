import { UrlState } from "@/context/context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

// eslint-disable-next-line react/prop-types
const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const { loading, isAuthenticate } = UrlState();

  useEffect(() => {
    if (!isAuthenticate && !loading) navigate("/auth");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticate, loading]);

  if (loading) return <BarLoader width={"100%"} color="#36d7b7" />;
  if (isAuthenticate) return children;
};

export default RequireAuth;
