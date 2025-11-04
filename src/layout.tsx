import { useLocation } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  const { pathname } = useLocation();

  return (
    <div className={`pb-5 pb-md-0 page-${pathname.split("/")[1]}`}>
      <div>
        {children}
      </div>
    </div>
  );
};

export default Layout;