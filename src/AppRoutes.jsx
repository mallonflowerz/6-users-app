import { useContext } from "react";
import { AuthContext } from "./auth/context/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";
import { LoginPage } from "./auth/pages/LoginPage";

export const AppRoutes = () => {
    const { login } = useContext(AuthContext);

    return (
        <Routes>
            {
                login.isAuth
                    ? (
                        <Route path='/*' element={<UserRoutes />} />
                    )
                    : <>
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/*' element={<Navigate to="/login" /> } />
                    </>
                    
            }
        </Routes>
    );
}