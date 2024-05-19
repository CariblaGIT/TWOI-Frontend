import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { Profile } from "../Profile/Profile";
import { Entity } from "../Entity/Entity";

export const Body = () => {
    return (
        <Routes>
            <Route path="*" element={<Navigate to={"/home"} replace/>} />
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/entity/:type" element={<Entity />} />
        </Routes>
    );
};