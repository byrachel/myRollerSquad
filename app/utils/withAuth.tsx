import { API_URL } from "app/constants/URL";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withAuth = (Component: any) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const [user, setUser] = useState({});

    useEffect(() => {
      const token = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : "";
      axios(`${API_URL}/api/user`, {
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
            // userDispatch({ type: "SET_USER", payload: res.data.user });
            setUser(res.data.user);
          } else {
            router.push("/signin");
          }
        })
        .catch(() => router.push("/signin"));
    }, [router]);

    return user ? <Component user={user} /> : null;
  };

  return AuthenticatedComponent;
};
export default withAuth;
