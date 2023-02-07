import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app } from "../config/firebase";
import { StorageService } from "./storage";

const auth = getAuth(app);

const logError = (error: any) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  console.log(errorCode, errorMessage);

  return Promise.reject(error);
};

export const AuthService = {
  async register(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password).catch(
      logError
    );
  },
  async login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        StorageService.save("@auth:token", result.user.uid);
        return result;
      })
      .catch(logError);
  },
  async logout() {
    return signOut(auth).then((result) => {
      StorageService.remove("@auth:token");
      return result;
    });
  },
};
