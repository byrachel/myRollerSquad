import { Dispatch, SyntheticEvent } from "react";
import axios from "axios";

import { E1 } from "src/constants/ErrorMessages";
import { IErrorCode } from "@/server/interfaces/globalInterfaces";

export const onRegister = (
  event: SyntheticEvent,
  registerDispatch: Dispatch<any>
) => {
  event.preventDefault();
  registerDispatch({
    type: "LOADING",
  });

  const target = event.target as typeof event.target & {
    pseudo: { value: string };
    email: { value: string };
    password: { value: string };
  };

  if (target.pseudo.value.length < 3 || target.pseudo.value.length > 20) {
    return registerDispatch({
      type: "ERROR",
      payload: "Le pseudo doit faire entre 3 et 20 caractères",
    });
  }

  const data = {
    name: target.pseudo.value,
    email: target.email.value,
    password: target.password.value,
  };

  axios({
    method: "post",
    url: `/api/auth/register`,
    data,
    withCredentials: true,
  })
    .then(() => {
      registerDispatch({
        type: "IS_REGISTERED",
      });
    })
    .catch((e: IErrorCode) => {
      registerDispatch({
        type: "ERROR",
        payload: e.response.data.message,
      });
    });
};

export const sendActivationMail = (
  id: number | null,
  setError: (error: { status: boolean; message: string }) => void,
  setActivationEmailSent: (status: boolean) => void
) => {
  setError({ status: false, message: "" });

  if (!id || typeof id !== "number")
    return setError({ status: true, message: E1 });

  axios({
    method: "post",
    url: `/api/auth/resend`,
    data: { id },
  })
    .then(() => setActivationEmailSent(true))
    .catch(() => setError({ status: true, message: E1 }));
};

export const onLogin = (
  event: SyntheticEvent,
  login: (user: any) => void,
  setError: (args: { status: boolean; message: string }) => void,
  setIsLoading: (status: boolean) => void,
  router: any
) => {
  event.preventDefault();
  setIsLoading(true);
  const target = event.target as typeof event.target & {
    email: { value: string };
    password: { value: string };
  };

  const data = {
    email: target.email.value,
    password: target.password.value,
  };

  axios({
    method: "post",
    url: `/api/auth/login`,
    data,
  })
    .then((res: any) => {
      login(res.data.user);
      router.push("/myrollerblog");
    })
    .catch((error: IErrorCode) => {
      setIsLoading(false);
      setError({ status: true, message: error.response.data.message });
    });
};

export const onLogout = (userLogout: any, router: any) => {
  axios({
    method: "POST",
    url: `/api/auth/logout`,
    withCredentials: true,
  }).then(() => {
    userLogout();
    router.push("/");
  });
};
