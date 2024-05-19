import "./UserMarks.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { getAllCharactersService, getAllMarksService } from "../../services/apiCalls";

export const UserMarks = () => {
    const publicServer = "https://twoi-backend-production.up.railway.app/api/public/"
    const [characters, setCharacters] = useState([])
    const [marks, setMarks] = useState([])
    const [selectedCharacter, setSelectedCharacter] = useState({
        "id" : 0
    })
    const [charactersLoaded, setCharactersLoaded] = useState(false)
    const [marksLoaded, setMarksLoaded] = useState(false)
    const [characterDropdownVisible, setCharacterDropdownVisible] = useState(false)
    const userToken = (useSelector(userData)).credentials.token
    const userDataToken = (useSelector(userData)).credentials.decoded
    const userMarks = userDataToken.marks

    useEffect(() => {
        if (!userToken) {
            navigate("/home")
        }
    }, [userToken])

    useEffect(() => {
        const getAllCharacters = async () => {
            try {
                const fetchedCharacters = await getAllCharactersService(userToken)
                setCharacters(fetchedCharacters.data)
                setSelectedCharacter(fetchedCharacters.data[0])
                setCharactersLoaded(true)
            } catch (error) {
                console.log(error);
            }
        }
        if(!charactersLoaded) { getAllCharacters() }
    }, [characters])

    useEffect(() => {
        const getAllMarks = async () => {
            try {
                const fetchedMarks = await getAllMarksService(userToken)
                setMarks(fetchedMarks.data)
                setMarksLoaded(true)
            } catch (error) {
                console.log(error);
            }
        }
        if(!marksLoaded) { getAllMarks() }
    }, [marks])

    const toggleCharacterDropdown = () => {
        setCharacterDropdownVisible(!characterDropdownVisible)
    }

    const hideCharacterDropdown = () => {
        setCharacterDropdownVisible(false)
    }

    const changeCharacterSelected = (character) => {
        setSelectedCharacter(character)
        loadSelectedCharacterMarks()
        hideCharacterDropdown()
    }

    const loadSelectedCharacterMarks = () => {
        return marks.map((itemMarkList) => {
            if(itemMarkList.character_id === selectedCharacter._id){
                return userMarks.map((itemUserMarksList) => {
                    if(itemUserMarksList === itemMarkList._id){
                        return (
                            <img
                                key={itemMarkList._id}
                                className="imgMarkLoaded"
                                src={publicServer + "marks/" + itemMarkList.image}
                                alt={itemMarkList.name}
                            />
                        )
                    }
                })
            }
        })
    }

    return (
        <div className="userMarksDesign">
            <div className="marksSelectorDesign">
                <button className="marksSectionDropdownButton" onClick={toggleCharacterDropdown}>
                    {selectedCharacter ? selectedCharacter.name : "Characters"} &nbsp; ▼
                </button>
                <div className="marksSectionDropdownContent">
                    {characters.map((item) => {
                        return (
                            <a key={item._id} onClick={() => changeCharacterSelected(item)}>{item.name}</a>
                        )
                    })}
                </div>
            </div>
            <div className="marksFromSelectedCharacter">
                {loadSelectedCharacterMarks()}
            </div>
        </div>
    )
}