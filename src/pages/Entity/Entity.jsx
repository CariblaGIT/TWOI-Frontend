import "./Entity.css";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { achievement, character, userData } from "../../app/slices/userSlice";
import { getAllAchievementsService, getAllCharactersService, getAllItemsService, getAllPickupsService, interactAchievementService, interactCharacterService } from "../../services/apiCalls";
import { mainTextAchievements, mainTextCharacters, mainTextItems, mainTextPickups } from '../../utils/entitiesTextConstants';
import { achievementsProperties, charactersProperties, itemsProperties, pickupsProperties, charactersPropertiesUserLog, achievementsPropertiesUserLog } from '../../utils/entitiesTextConstants';

export const Entity = () => {
    let { type } = useParams()
    const dispatch = useDispatch()
    const rdxInstance = useSelector(userData)
    const [entityData, setEntityData] = useState([])
    const [entityHeaderData, setEntityHeaderData] = useState([])
    const [entityText, setEntityText] = useState("")
    const publicServer = "https://twoi-backend-production.up.railway.app/api/public/"
    const userToken = (useSelector(userData))?.credentials?.token
    const userDataToken = (useSelector(userData))?.credentials?.decoded
    const userAchievements = userDataToken?.achievements
    const userCharacters = userDataToken?.characters

    useEffect(() => {
        const getEntityData = async () => {
            try {
                switch (type) {
                    case "achievements":
                        const fetchedAchievements = await getAllAchievementsService()
                        setEntityData(fetchedAchievements.data)
                        if(userToken){
                            setEntityHeaderData(achievementsPropertiesUserLog)
                        } else {
                            setEntityHeaderData(achievementsProperties)
                        }
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
                        if(userToken){
                            setEntityHeaderData(charactersPropertiesUserLog)
                        } else {
                            setEntityHeaderData(charactersProperties)
                        }
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
                        <td>{item.type?.toUpperCase()}</td>
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
                        {userToken && (
                            userAchievements.includes(item._id) ? (
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={true}
                                        onChange={(e) => handleCheckboxChange(e, item._id, "achievement")}
                                    />
                                </td>
                                ) : (
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={false}
                                        onChange={(e) => handleCheckboxChange(e, item._id, "achievement")}
                                    />
                                </td>
                                )
                        )}
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
                        <td>{item.type?.toUpperCase()}</td>
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
                        {userToken && (
                            userCharacters.includes(item._id) ? (
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={true}
                                        onClick={(e) => handleCheckboxChange(e, item._id, "character")}
                                        onChange={(e) => handleChangeInteraction()}
                                    />
                                </td>
                                ) : (
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={false}
                                        onClick={(e) => handleCheckboxChange(e, item._id, "character")}
                                        onChange={(e) => handleChangeInteraction()}
                                    />
                                </td>
                                )
                        )}
                    </tr>
                ));
        }
    }

    const handleChangeInteraction = () => {

    }

    const handleCheckboxChange = async (e, id, type) => {
        if (type === "character"){
            const fetched = await interactCharacterService(userToken, id);
            const listCharacterss = fetched.data.characters
            const charactersMarkedIds = []
            for(let i = 0; i < listCharacterss.length; i++){
                charactersMarkedIds.push(listCharacterss[i]._id)
            }
            dispatch(character({ credentials: { ...rdxInstance.credentials, decoded: { ...rdxInstance.credentials.decoded, characters: charactersMarkedIds }}}))
        } else if (type === "achievement"){
            const fetched = await interactAchievementService(userToken, id);
            const listAchievements = fetched.data.achievements
            const achievementMarkedIds = []
            for(let i = 0; i < listAchievements.length; i++){
                achievementMarkedIds.push(listAchievements[i]._id)
            }
            dispatch(achievement({ credentials: { ...rdxInstance.credentials, decoded: { ...rdxInstance.credentials.decoded, achievements: achievementMarkedIds }}}))
        }
        const stateChecker = e.target.checked
        stateChecker ? e.target.checked = true : e.target.checked = false
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