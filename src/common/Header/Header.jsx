import { HeaderSection } from "../HeaderSection/HeaderSection";
import "./Header.css";

export const Header = () => {
    return (
        <div className="headerDesign">
            <img className="logoImgHeader" src="../../../public/logo.png"/>
            <h3>The Wiki of Isaac</h3>
            <HeaderSection/>
        </div>
    )
}