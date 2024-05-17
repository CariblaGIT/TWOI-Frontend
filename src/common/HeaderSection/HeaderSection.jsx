import "./HeaderSection.css";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export const HeaderSection = () => {
    const navigate = useNavigate()
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const navigateToCharacters = () => {
        navigate("entity/characters")
        hideDropdown() 
    }

    const navigateToItems = () => {
        navigate("entity/items")
        hideDropdown()
    }

    const navigateToPickups = () => {
        navigate("entity/pickups")
        hideDropdown()
    }

    const navigateToAchievements = () => {
        navigate("entity/achievements")
        hideDropdown()
    }

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    }

    const hideDropdown = () => {
        setDropdownVisible(false)
    }

    return (
        <div className="headerSectionDesign">
            <button className="headerSectionDropdownButton" onClick={toggleDropdown}>
                Explore &nbsp; ▼
            </button>
            {isDropdownVisible && (
                <div className="headerSectionDropdownContent">
                <a id="characters" onClick={navigateToCharacters}>Characters</a>
                <a id="items" onClick={navigateToItems}>Items</a>
                <a id="pickups" onClick={navigateToPickups}>Pickups</a>
                <a id="achievements" onClick={navigateToAchievements}>Achievements</a>
                </div>
            )}
        </div>
    )
}