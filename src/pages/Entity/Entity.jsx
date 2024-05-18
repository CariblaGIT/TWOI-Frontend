import "./Entity.css";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getAllAchievementsService, getAllCharactersService, getAllItemsService, getAllPickupsService } from "../../services/apiCalls";

export const Entity = () => {
    let { type } = useParams()
    const [entityData, setEntityData] = useState([])
    const [loadedEntityData, setLoadedEntityData] = useState(false)

    useEffect(() => {
        const getEntityData = async () => {
            try {
                switch (type) {
                    case "achievements":
                        const fetchedAchievements = await getAllAchievementsService()
                        setLoadedEntityData(true)
                        setEntityData(fetchedAchievements.data)
                        break;
                    case "items":
                        const fetchedItems = await getAllItemsService()
                        setLoadedEntityData(true)
                        setEntityData(fetchedItems.data)
                        break;
                    case "characters":
                        const fetchedCharacters = await getAllCharactersService()
                        setLoadedEntityData(true)
                        setEntityData(fetchedCharacters.data)
                        break;
                    case "pickups":
                        const fetchedPickups = await getAllPickupsService()
                        setLoadedEntityData(true)
                        setEntityData(fetchedPickups.data)
                        break;
                }
            } catch (error) {
                console.log(error)
            }
        }
    
        if (!loadedEntityData) { getEntityData() }
    }, [entityData])

    return (
        <div className="entityDesign">
            <h2 className="entityHeader">{type.toUpperCase()}</h2>
        </div>
    )
}