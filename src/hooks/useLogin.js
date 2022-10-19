import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from '../firebase/auth';
import { FIREBASE_LOGIN_ERRORS } from '../constants';

export const useLogin = () => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  async function login(email, password) {
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch({ code }) {
      if (code === FIREBASE_LOGIN_ERRORS.INVALID_EMAIL) {
        setError('The e-mail provided is invalid, try a different one.');
      } else if (code === FIREBASE_LOGIN_ERRORS.WRONG_PASSWORD) {
        setError('The password provided does not match with the account.');
      } else if (code === FIREBASE_LOGIN_ERRORS.INTERNAL_ERROR) {
        setError('Something went wrong, please try again.');
      } else if (code === FIREBASE_LOGIN_ERRORS.USER_NOT_FOUND) {
        setError('The email was not used to create an account yet.');
      } else if (code === FIREBASE_LOGIN_ERRORS.REQUEST_LIMIT) {
        setError('You reached the number of requests you can make, try again later.');
      } else {
        setError(code);
      }
    }

    setLoading(false);
  }

  return { loading, error, login };
};
