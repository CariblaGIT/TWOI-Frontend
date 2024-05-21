import "./HeaderSection.css";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";

export const HeaderSection = () => {
    const navigate = useNavigate()
    const [isDropdownVisible, setDropdownVisible] = useState(false)
    const userToken = (useSelector(userData))?.credentials?.token
    const userRole = (useSelector(userData))?.credentials?.decoded?.role

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

    const navigateToLogin = () => {
        navigate("login")
        hideDropdown()
    }

    const navigateToProfile = () => {
        navigate("profile")
        hideDropdown()
    }

    const navigateToAdmin = () => {
        navigate("admin")
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
            {(isDropdownVisible && userToken) && (
                <div className="headerSectionDropdownContent">
                    <a id="characters" onClick={navigateToCharacters}>Characters</a>
                    <a id="items" onClick={navigateToItems}>Items</a>
                    <a id="pickups" onClick={navigateToPickups}>Pickups</a>
                    <a id="achievements" onClick={navigateToAchievements}>Achievements</a>
                    <a id="profile" onClick={navigateToProfile}>Profile</a>
                    {userRole === "super_admin" ? (
                        <a id="admin" onClick={navigateToAdmin}>Admin</a>
                    ) : (
                        <></>
                    )}
                </div>
            )}
            {(isDropdownVisible && !userToken) && (
                <div className="headerSectionDropdownContent">
                    <a id="characters" onClick={navigateToCharacters}>Characters</a>
                    <a id="items" onClick={navigateToItems}>Items</a>
                    <a id="pickups" onClick={navigateToPickups}>Pickups</a>
                    <a id="achievements" onClick={navigateToAchievements}>Achievements</a>
                    <a id="login" onClick={navigateToLogin}>Login</a>
                </div>
            )}
        </div>
    )
}