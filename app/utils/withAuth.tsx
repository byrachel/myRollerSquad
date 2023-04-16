import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (Component: any) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        console.log("WITH AUTH", token);
        axios(`/api/user/islogged`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
          .then(res => {
            if (res.data.user) {
              const token = res.headers["authorization"];
              if (token) {
                localStorage.setItem("token", token);
              }
            } else {
              router.push("/signin");
            }
          })
          .catch(() => router.push("/signin"));
      } else {
        router.push("/signin");
      }
      // eslint-disable-next-line
    }, []);

    return <Component />;
  };

  return AuthenticatedComponent;
};
export default withAuth;
