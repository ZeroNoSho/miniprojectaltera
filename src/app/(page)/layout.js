import Nav from "@/components/navbar";
import Menu from "@/components/menu";
import Foot from "@/components/foot";
import { Provider } from "../../context/store";

export default function MenuLayout({
  children, // will be a page or nested layout
}) {
  return (
    <div className="flex">
      <Provider>
        <Menu></Menu>
        <div className="w-full">
          <Nav></Nav>
          {children}
          <Foot></Foot>
        </div>
      </Provider>
    </div>
  );
}
