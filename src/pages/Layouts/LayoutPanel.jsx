import { Outlet } from "react-router-dom";
import NavbarComponent from "../../Components/Panel/Navbar";

function LayoutPanel() {
  return (
    <body>
      <NavbarComponent/>
      <Outlet />
    </body>
  );
}

export default LayoutPanel;
