import "./Profile.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, profile, userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../common/FormInput/FormInput";
import { FormButton } from "../../common/FormButton/FormButton";
import { UpdateProfileWithAvatar, UpdateProfileWithoutAvatar, getProfileService } from "../../services/apiCalls";
import { validateRegisterData } from "../../utils/userDataValidation";

export const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const rdxInstance = useSelector(userData)
    const userToken = (useSelector(userData)).credentials.token
    const userDataToken = (useSelector(userData)).credentials.decoded
    const userMarks = userDataToken.marks
    const publicServer = "https://twoi-backend-production.up.railway.app/api/public/"
    const [avatar, setAvatar] = useState(publicServer + "avatars/" + userDataToken.avatar)
    const [avatarToUpload, setAvatarToUpload] = useState(undefined)
    const [user, setUser] = useState({
        username: "",
        avatar: ""
    })
    const [userPrevToUpdate, setUserPrevToUpdate] = useState({
        username: "",
        avatar: ""
    })
    const [loadedUser, setLoadedUser] = useState(false)
    const [write, setWrite] = useState("disabled")
    const [msgUploadedFile, setMsgUploadedFile] = useState("")
    const [msgUpdatedProfile, setMsgUpdatedProfile] = useState("")
    const [userError, setUserError] = useState({
        usernameError: "",
        avatarError: ""
    })

    useEffect(() => {
        if (!userToken) {
            navigate("/home")
        }
    }, [userToken])

    useEffect(() => {
        const getUserProfileData = async () => {
            try {
                const fetched = await getProfileService(userToken)
                setUser({
                    username: fetched.data.username,
                    avatar: fetched.data.avatar
                })
                setLoadedUser(true)
            } catch (error) {
                console.log(error)
            }
        }

        if(!loadedUser) { getUserProfileData() }
    }, [user])

    const activateUpdate = () => {
        setWrite("")
        setUserPrevToUpdate(user)
    }

    const cancelUpdateProfile = () => {
        setWrite("disabled")
        setUser(userPrevToUpdate)
        setAvatarToUpload(undefined)
        setMsgUploadedFile("")
    }

    const profileInputHandler = (e) => {
        setUser((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            setAvatarToUpload(e.target.files[0])
            setMsgUploadedFile("File retrieved, save to change avatar")
        }
    }

    const checkInputError = (e) => {
        const error = validateRegisterData(e.target.name, e.target.value);
    
        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error
        }))
    }

    const updateUserData = async () => {
        try {
            if(avatarToUpload === undefined){
                const fetched = await UpdateProfileWithoutAvatar(userToken, user)
                console.log(fetched);
                setUser({
                    username: fetched.data.username,
                })
                setUserPrevToUpdate(user)
                setWrite("disabled")
                setMsgUpdatedProfile("Updated profile successfully")
                dispatch(profile({ credentials: { ...rdxInstance.credentials, decoded: { ...rdxInstance.credentials.decoded, username: fetched.data.username }}}))
                setTimeout(() => {
                    setMsgUpdatedProfile("")
                }, 2000)
            } else {
                const fetched = await UpdateProfileWithAvatar(userToken, user, avatarToUpload)
                const newUserData = {
                    username: fetched.data.username,
                    avatar: fetched.data.avatar
                }
                setUser(newUserData)
                setUserPrevToUpdate(newUserData)
                const newAvatar = fetched.data.avatar
                setAvatarToUpload(undefined)
                setAvatar(publicServer + "avatars/" + newAvatar)
                setWrite("disabled")
                setMsgUploadedFile("")
                setMsgUpdatedProfile("Updated profile successfully")
                dispatch(profile({ credentials: { ...rdxInstance.credentials, decoded: { ...rdxInstance.credentials.decoded, username: fetched.data.username, avatar: fetched.data.avatar}}}))
                setTimeout(() => {
                    setMsgUpdatedProfile("")
                }, 2000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const logoutFunction = () => {
        dispatch(logout({ credentials: "" }))
        navigate("/login")
    }

    const navigateToMarks = () => {
        navigate("/marks")
    }

    return (
        <div className="profileDesign">
            <FormButton
                buttonText={"MARKS"}
                className={"formButtonDesign"}
                onClickFunction={navigateToMarks}
            />
            <div className="profileContent">
                <img className="avatarImgProfile" src={avatar}/>
                {/* {write !== "disabled" ? (
                    <>
                    <label htmlFor="file" className={"iconImg"}>
                        <p>+</p>
                    </label>
                    <input id="file" type="file" name="avatar" disabled={write} className={"fileSelector"} onChange={handleFileChange}/>
                    </>
                ) : (
                    <></>
                )} */}
                <div className="fileRetrievedMsg">{msgUploadedFile}</div>
                <FormInput
                    labelText={"username"}
                    className={"formInputField"}
                    type={"text"}
                    name={"username"}
                    placeholder={"Write a username"}
                    disabled={write}
                    value={user.username || ""}
                    onChange={e => profileInputHandler(e)}
                    onBlur={e => checkInputError(e)}
                />
                <div className="inputError">{userError.usernameError}</div>
                <div className="interactionButtons">
                    {write === "" ? (
                        <FormButton
                            buttonText={"RETURN"}
                            className={"formButtonDesign"}
                            onClickFunction={cancelUpdateProfile}
                        />
                    ) : (
                        <FormButton
                            buttonText={"LOG OUT"}
                            className={"formButtonDesign"}
                            onClickFunction={logoutFunction}
                        />
                    )}
                    <FormButton
                        buttonText={write === "" ? "SAVE" : "EDIT"}
                        className={write === "" ? "formButtonDesignEdit" : "formButtonDesign"}
                        onClickFunction={write === "" ? updateUserData : activateUpdate}
                    />
                </div>
                <div className="updatedProfile">{msgUpdatedProfile}</div>
            </div>
        </div>
    )
}