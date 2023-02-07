import { FormEvent, useCallback, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth";

export const LoginPage = () => {
  const auth = useAuth();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const logIn = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      auth
        .login(emailRef.current?.value ?? "", passwordRef.current?.value ?? "")
        .catch(console.log);
    },
    [emailRef.current, passwordRef.current, auth.login]
  );

  if (auth.isLoggedIn()) return <Navigate to="/admin" replace={true} />;

  return (
    <form onSubmit={logIn} method="post" className="card flow">
      <label className="field">
        <span>E-mail</span>
        <input ref={emailRef} type="email" name="email" id="email" />
      </label>

      <label className="field">
        <span>Password</span>
        <input
          ref={passwordRef}
          type="password"
          name="password"
          id="password"
        />
      </label>

      <button className="button">Log in</button>
    </form>
  );
};
