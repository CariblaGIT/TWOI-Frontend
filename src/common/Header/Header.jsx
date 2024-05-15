import "./Header.css";
import { useLocation } from "react-router-dom";
import { HeaderSection } from "../HeaderSection/HeaderSection";

export const Header = () => {
    const locations = ["/register", "/login"]
    const location = useLocation()

    if(!locations.includes(location.pathname)){
        return (
            <div className="headerDesign">
                <img className="logoImgHeader" src="../../../public/logo.png"/>
                <h3 className="headerWebsiteName">The Wiki of Isaac</h3>
                <HeaderSection/>
            </div>
        )
    }
}