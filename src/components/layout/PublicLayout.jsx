import HeaderComponent from "../home/Header";
import FooterComponent from "../Footer";
import { Fragment } from "react";

const LayoutComponent = ({ children }) => {
   return (
      <Fragment>
         <HeaderComponent />
         {children}
         <FooterComponent />
      </Fragment>
   );
};

export default LayoutComponent;
