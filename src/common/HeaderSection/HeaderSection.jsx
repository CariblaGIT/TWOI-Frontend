import "./HeaderSection.css";
import { useNavigate } from "react-router-dom";

export const HeaderSection = () => {
    const navigate = useNavigate()

    const navigateToCharacters = () => {
        navigate("characters")
    }

    const navigateToItems = () => {
        navigate("items")
    }

    const navigateToPickups = () => {
        navigate("pickups")
    }

    const navigateToAchievements = () => {
        navigate("achievements")
    }

    return (
        <div className="headerSectionDesign">
            <button className="headerSectionDropdownButton">Explore &nbsp; ▼</button>
            <div className="headerSectionDropdownContent">
                <a id="characters" onClick={navigateToCharacters}>Characters</a>
                <a id="items" onClick={navigateToItems}>Items</a>
                <a id="pickups" onClick={navigateToPickups}>Pickups</a>
                <a id="achievements" onClick={navigateToAchievements}>Achievements</a>
            </div>
        </div>
    )
}