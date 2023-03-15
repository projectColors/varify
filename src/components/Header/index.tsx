import { LogoLink, TopHeader, TopLink } from "./style";
import varify from "../../assets/varify.png";
import { IVarContextProps } from "../../providers/@types";

const Header = ({ children }: IVarContextProps) => {
  return <TopHeader>{children}</TopHeader>;
};

export default Header;
