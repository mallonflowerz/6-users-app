import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../components/layout/Navbar"
import { RegisterPage } from "../pages/RegisterPage"
import { UsersPage } from "../pages/UsersPage"
import { UsersChangePage } from "../pages/UsersChangePage"
import { useAuth } from "../auth/hooks/useAuth"

export const UserRoutes = () => {
    const { login } = useAuth();
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="users" element={<UsersPage />} />

                {!login.isAdmin || <>
                    <Route path="users/register" element={<RegisterPage />} />
                    <Route path="users/edit/:id" element={<RegisterPage />} />
                    <Route path="users/changePassword" element={<UsersChangePage />} />
                </>
                }

                <Route path="/" element={<Navigate to="/users" />} />
            </Routes>
        </>
    )
}