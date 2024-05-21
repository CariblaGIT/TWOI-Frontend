import "./AdminPanel.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/slices/userSlice";
import { getUsersAsAdminService } from "../../services/apiCalls";

export const AdminPanel = () => {
    const navigate = useNavigate()
    const userToken = (useSelector(userData))?.credentials?.token
    const userDataToken = (useSelector(userData))?.credentials?.decoded
    const [users, setUsers] = useState([])
    const [usersLoaded, setUsersLoaded] = useState(false)

    useEffect(() => {
        if (!userToken || userDataToken.role !== "super_admin") {
            navigate("/home")
        }
    }, [userToken])

    useEffect(() => {
        const getAllUsers = async () => {
            const fetched = await getUsersAsAdminService(userToken);
            setUsers(fetched.data)
            setUsersLoaded(true)
        }

        if(!usersLoaded) { getAllUsers() }
    }, [users])

    return (
        <div className="adminPanelDesign">
            <div className="adminHeaderDesign">
                <div className="adminPanelHeader">
                    <h3>Admin Panel</h3>
                </div>
            </div>
            <div className="adminContent">
                <table className="adminUsersTable">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td data-label="#">{index}</td>
                                        <td data-label="Username">{item.username}</td>
                                        <td data-label="Email">{item.email}</td>
                                        <td data-label="Role">{item.role}</td>
                                        <td data-label="Options">Options Here</td>
                                    </tr>
                                )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}