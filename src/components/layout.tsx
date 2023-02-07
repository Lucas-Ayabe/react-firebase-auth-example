import { Menu } from "./menu";

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="app container flow">
      <Menu />
      <main>{children}</main>
    </div>
  );
};
