import "./Header.css";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderSection } from "../HeaderSection/HeaderSection";
import logo from '../../../public/logo.png'; // Tell webpack this JS file uses this image

export const Header = () => {
    const locations = ["/register", "/login"]
    const location = useLocation()
    const navigate = useNavigate()

    const navigateHome = () => {
        navigate("home")
    }

    if(!locations.includes(location.pathname)){
        return (
            <div className="headerDesign">
                <img className="logoImgHeader" src={logo} onClick={navigateHome}/>
                <h3 className="headerWebsiteName">The Wiki of Isaac</h3>
                <HeaderSection/>
            </div>
        )
    }
}