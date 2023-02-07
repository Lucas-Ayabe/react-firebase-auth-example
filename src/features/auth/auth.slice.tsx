import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useReducer,
} from "react";

import { useNavigate } from "react-router-dom";

import { AuthService } from "../../services/auth";
import { StorageService } from "../../services/storage";

export type AuthState =
  | { state: "LOGGED_OUT"; token: null }
  | { state: "LOGGED_IN"; token: string };

export type AuthContextState = AuthState & {
  isLoggedIn(): boolean;
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
};

export type AuthAction =
  | { type: "LOG_IN"; payload: string }
  | { type: "LOG_OUT" };

export const authActions = {
  login(token: string): AuthAction {
    return { type: "LOG_IN", payload: token };
  },
  logout(): AuthAction {
    return { type: "LOG_OUT" };
  },
};

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOG_IN":
      return { ...state, state: "LOGGED_IN", token: action.payload };
    case "LOG_OUT":
      return { ...state, state: "LOGGED_OUT", token: null };
    default:
      return state;
  }
};

export const AuthContext = createContext<AuthContextState>({
  state: "LOGGED_OUT",
  token: null,
  isLoggedIn() {
    return false;
  },
  async login(_email, _password) {},
  async logout() {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const token = StorageService.get("@auth:token");

  const [state, dispatch] = useReducer(
    authReducer,
    token
      ? { state: "LOGGED_IN", token }
      : {
          state: "LOGGED_OUT",
          token: null,
        }
  );

  const contextState: AuthContextState = useMemo(
    () => ({
      ...state,
      isLoggedIn() {
        return state.state === "LOGGED_IN";
      },
      async login(email, password) {
        AuthService.login(email, password).then(({ user }) => {
          dispatch(authActions.login(user.uid));
        });
      },
      async logout() {
        AuthService.logout()
          .then(() => {
            dispatch(authActions.logout());
          })
          .catch(console.log);
      },
    }),
    [state, state.token, dispatch]
  );

  return (
    <AuthContext.Provider value={contextState}>{children}</AuthContext.Provider>
  );
};
