import { getCurrentUser } from "@/db/apiAuth";
import useFetch from "@/hooks/use-fetch";

import { createContext, useContext, useEffect } from "react";

const UrlContext = createContext();

const UserContext = ({ children }) => {
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser);
  const isAuthenticate = user?.role == "authenticated";
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UrlContext.Provider value={{ user, loading, fetchUser, isAuthenticate }}>
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = () => {
  return useContext(UrlContext);
};

export default UserContext;
