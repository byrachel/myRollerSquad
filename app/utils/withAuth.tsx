import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withAuth = (Component: any) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const [data, setData] = useState();

    useEffect(() => {
      const token = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : "_";
      axios(`/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
        .then(res => {
          const token = res.headers["authorization"];
          if (token) {
            localStorage.setItem("token", token);
          }
          // userDispatch({ type: "SET_USER", payload: res.data.user });
          setData(res.data.user);
        })
        .catch(err => router.push("/signin"));
    }, []);

    return data ? <Component data={data} /> : null;
  };

  return AuthenticatedComponent;
};
export default withAuth;
