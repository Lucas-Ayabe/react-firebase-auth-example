import { FormEvent, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth";

export const AdminPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const logout = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      await auth.logout();
      navigate("/login");
    },
    [auth.logout, navigate]
  );

  if (!auth.isLoggedIn()) return <Navigate to="/login" replace={true} />;
  return (
    <section>
      <h1>Admin</h1>
      <form method="post" onSubmit={logout}>
        <button className="button">Log out</button>
      </form>
    </section>
  );
};
