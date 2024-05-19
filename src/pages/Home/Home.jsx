import "./Home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate()

    const navigateToEntity = (type) => {
        navigate('/entity/'+type)
    }

    return (
        <div className="homeDesign">
            <div className="homeWelcomeSection">
                <h2 className="headerHomeWelcomeSection">Welcome to The Wiki of Isaac</h2>
                <p className="textHomeWelcomeSection">The best wiki of the game The Binding of Isaac, in which one you will be able to check all the information about the game and, moreover, save your progress in an easy and visual way</p>
            </div>
            <div className="aboutGameSection">
                <h2 className="headerAboutGameSection">About The Binding of Isaac</h2>
                <p className="textAboutGameSection">The Binding of Isaac is an action game based on games generated randomly, builds about objects, enemies in rooms and bosses that marks the player progress. On this adventure, you will play as Isaac and other charismatic characters with unique abilities to defeat the Isaac fears</p>
            </div>
            <div className="sectionsSection">
                <h2 className="headerSectionsSection">Content</h2>
                <div className="tableContent">
                    <div className="sectionLink" onClick={() => navigateToEntity("achievements")}>
                        <img className="sectionImg" src="../../../public/sections/achievements.png"/>
                        Achievements
                    </div>
                    <div className="sectionLink" onClick={() => navigateToEntity("characters")}>
                        <img className="sectionImg" src="../../../public/sections/characters.png"/>
                        Characters
                    </div>
                    <div className="sectionLink" onClick={() => navigateToEntity("items")}>
                        <img className="sectionImg" src="../../../public/sections/items.png"/>
                        Items
                    </div>
                    <div className="sectionLink" onClick={() => navigateToEntity("pickups")}>
                        <img className="sectionImg" src="../../../public/sections/pickups.png"/>
                        Pickups
                    </div>
                </div>
            </div>
        </div>
    )
}