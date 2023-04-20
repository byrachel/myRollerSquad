import { Dispatch, SyntheticEvent } from "react";
import { E1 } from "app/constants/ErrorMessages";
import axios from "axios";

export const onRegister = (
  event: SyntheticEvent,
  setError: (args: { status: boolean; message: string }) => void,
  setIsRegistered: (status: boolean) => void
) => {
  event.preventDefault();
  setError({ status: false, message: "" });

  const target = event.target as typeof event.target & {
    pseudo: { value: string };
    email: { value: string };
    password: { value: string };
  };

  if (target.pseudo.value.length < 3 || target.pseudo.value.length > 20) {
    return setError({
      status: true,
      message: "Le pseudo doit faire entre 3 et 20 caractères",
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
  })
    .then(() => setIsRegistered(true))
    .catch(() => setError({ status: true, message: E1 }));
};

export const sendActivationMail = (
  setError: (error: { status: boolean; message: string }) => void,
  id: number | null,
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
  userDispatch: Dispatch<any>,
  router: any,
  setError: (args: { status: boolean; message: string }) => void
) => {
  event.preventDefault();

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
      console.log(res.data);
      userDispatch({
        type: "LOGIN",
        payload: { id: res.data.user.id, role: res.data.user.role },
      });
      router.push("/myrollerblog");
    })
    .catch(() => setError({ status: true, message: E1 }));
};
