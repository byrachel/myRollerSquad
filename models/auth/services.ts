import React, { Dispatch, SyntheticEvent } from "react";
import { AuthRepository } from "controllers/auth.repo";
import { E1 } from "views/constants/ErrorMessages";

export const onRegister = async (
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

  const newUser = new AuthRepository();
  const newUserIsRegistered = await newUser.register(data);

  if (newUserIsRegistered.status === "SUCCESS") {
    registerDispatch({
      type: "IS_REGISTERED",
    });
  } else {
    registerDispatch({
      type: "ERROR",
      payload: newUserIsRegistered.message ? newUserIsRegistered.message : E1,
    });
  }
};

export const accountActivation = async (
  userId: number,
  setUserAccountIsActive: React.Dispatch<React.SetStateAction<boolean | null>>
) => {
  const newUser = new AuthRepository();
  const newUserIsActivated = await newUser.userAccountActivation(userId);

  if (newUserIsActivated.status === "SUCCESS") {
    return setUserAccountIsActive(true);
  } else {
    return setUserAccountIsActive(false);
  }
};

export const sendActivationMail = async (
  id: number | null,
  setError: (error: { status: boolean; message: string }) => void,
  setActivationEmailSent: (status: boolean) => void
) => {
  setError({ status: false, message: "" });

  if (!id || typeof id !== "number")
    return setError({ status: true, message: E1 });

  const newUser = new AuthRepository();
  const activationMailSent = await newUser.sendActivationMail(id);

  if (activationMailSent.status === "SUCCESS") {
    return setActivationEmailSent(true);
  } else {
    return setError({ status: true, message: E1 });
  }
};
