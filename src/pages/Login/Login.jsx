import "./Login.css";
import { decodeToken } from "react-jwt";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../app/slices/userSlice";
import { userData } from "../../app/slices/userSlice";
import { loginService } from "../../services/apiCalls";
import { InputAuth } from "../../common/InputAuth/InputAuth";
import { ButtonAuth } from "../../common/ButtonAuth/ButtonAuth";

export const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [success, setSuccess] = useState(false)
    const [msgSuccess, setMsgSuccess] = useState("")
    const [notAllowToLogin, setNotAllowToLogin] = useState(true)
    const userToken = (useSelector(userData))?.credentials?.token

    const [credentials, setCredentials] = useState({
        email : "",
        password : ""
    })

    useEffect(() => {
        if (userToken) {
            navigate("/home")
        }
    }, [userToken])

    useEffect(() => {
        if(credentials.email !== "" && credentials.password !== ""){
            setNotAllowToLogin(false)
        } else {
            setNotAllowToLogin(true)
        }
    }, [credentials])

    const registerRedirect = () => {
        navigate("/register")
    }

    const loginCredentialsHandler = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const loginUserCall = async () => {
        try {
            const fetched = await loginService(credentials)
            if(fetched.success === false){
                throw new Error("Invalid credentials")
            }
            setSuccess(true)
            const decodedToken = decodeToken(fetched.token)

            const passport = {
                token: fetched.token,
                decoded: decodedToken,
            }
            dispatch(login({ credentials: passport }))
            // if(decodedToken.roleName === "super_admin"){
            //     setMsgSuccess(fetched.message + "\n" + "Redirecting to admin panel")
            //     setTimeout(() => {
            //         navigate("/admin")
            //     }, 3000)
            // } else {
            //     setMsgSuccess(fetched.message + "\n" + "Redirecting to your timeline")
            //     setTimeout(() => {
            //         navigate("/home")
            //     }, 3000)
            // }
            setMsgSuccess(fetched.message + "\n" + "Redirecting to home")
            setTimeout(() => {
                navigate("/home")
            }, 3000)
        } catch (error) {
            setSuccess(false)
            setMsgSuccess(error.message)
        }
    }

    return (
        <div className="loginDesign">
            <div className="loginForm">
                <img className="isaacIconLogin" src="../../../public/icon.png"/>
                <h2 className="appName">The Wiki of Isaac</h2>
                <InputAuth
                    className={"inputAuthForm"} 
                    type={"email"}
                    name={"email"}
                    value={credentials.email || ""} 
                    placeholder={"User or email"}
                    onChange={e => loginCredentialsHandler(e)}
                />
                <InputAuth
                    className={"inputAuthForm"} 
                    type={"password"}
                    name={"password"}
                    value={credentials.password || ""} 
                    placeholder={"Password"}
                    onChange={e => loginCredentialsHandler(e)}
                />
                <ButtonAuth
                    className={"buttonAuthDesign"}
                    buttonText={"Login"}
                    onClickFunction={loginUserCall}
                    disabled={notAllowToLogin}
                />
                <div className={(!success ? "loginError" : "loginSuccess")}>{msgSuccess}</div>
                <div className="forgetPassword">
                    <a className="registerLink">Do you forget your password?</a>
                </div>
            </div>
            <div className="registerContent">
                <p className="registerText">You do not have an account?</p> <a className="registerLink" onClick={registerRedirect}>Register</a>
            </div>
        </div>
    )
}