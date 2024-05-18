import "./Entity.css";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getAllAchievementsService, getAllCharactersService, getAllItemsService, getAllPickupsService } from "../../services/apiCalls";
import { mainTextAchievements, mainTextCharacters, mainTextItems, mainTextPickups } from '../../utils/entitiesTextConstants';
import { achievementsProperties, charactersProperties, itemsProperties, pickupsProperties } from '../../utils/entitiesTextConstants';

export const Entity = () => {
    let { type } = useParams()
    const [entityData, setEntityData] = useState([])
    const [entityHeaderData, setEntityHeaderData] = useState([])
    const [entityText, setEntityText] = useState("")
    const publicServer = "https://twoi-backend-production.up.railway.app/api/public/"

    useEffect(() => {
        const getEntityData = async () => {
            try {
                switch (type) {
                    case "achievements":
                        const fetchedAchievements = await getAllAchievementsService()
                        setEntityData(fetchedAchievements.data)
                        setEntityHeaderData(achievementsProperties)
                        setEntityText(mainTextAchievements)
                        break;
                    case "items":
                        const fetchedItems = await getAllItemsService()
                        setEntityData(fetchedItems.data)
                        setEntityHeaderData(itemsProperties)
                        setEntityText(mainTextItems)
                        break;
                    case "characters":
                        const fetchedCharacters = await getAllCharactersService()
                        setEntityData(fetchedCharacters.data)
                        setEntityHeaderData(charactersProperties)
                        setEntityText(mainTextCharacters)
                        break;
                    case "pickups":
                        const fetchedPickups = await getAllPickupsService()
                        setEntityData(fetchedPickups.data)
                        setEntityHeaderData(pickupsProperties)
                        setEntityText(mainTextPickups)
                        break;
                }
            } catch (error) {
                console.log(error)
            }
        }
    
        getEntityData();
    }, [type])

    useEffect(() => {
        console.log(entityData)
    }, [entityData])

    const fulfillTable = () => {
        switch (type) {
            case "pickups":
                return entityData.map((item) => (
                    <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>
                            <img src={publicServer + type + "/" + item.image} alt={item.name} />
                        </td>
                        <td className="centerTableContent">{item.description}</td>
                        <td>{(item.type).toUpperCase()}</td>
                    </tr>
                ));
                case "achievements":
                    return entityData.map((item) => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>
                                <img src={publicServer + type + "/" + item.image} alt={item.name} />
                            </td>
                            <td className="centerTableContent">{item.description}</td>
                            <td className="centerTableContent">{item.how_to}</td>
                        </tr>
                    ));
                case "items":
                    return entityData.map((item) => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>
                                <img className="itemsImgs" src={publicServer + type + "/" + item.image} alt={item.name} />
                            </td>
                            <td className="centerTableContent">{item.description}</td>
                            <td>{(item.type).toUpperCase()}</td>
                        </tr>
                    ));
                case "characters":
                    return entityData.map((item) => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>
                                <img src={publicServer + type + "/" + item.image} alt={item.name} />
                            </td>
                            <td className="centerTableContent">{item.unlock}</td>
                        </tr>
                    ));
        }
    }

    return (
        <div className="entityDesign">
            <h2 className="entityHeader">{type.toUpperCase()}</h2>
            <p className="entitySubHeader">{entityText}</p>
            <table className="tableEntity">
                <thead>
                    <tr>
                        {entityHeaderData.map((item) => {
                            return (
                               <th key={item}>{item}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {fulfillTable()}
                </tbody>
            </table>
        </div>
    )
}