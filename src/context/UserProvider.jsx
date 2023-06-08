import { useUsers } from "../hooks/useUsers";
import { UserContext } from "./UserContext"

export const UserProvider = ({children}) => {

    const {
        users,
        userSelected,
        initialUserForm,
        initialChangePassw,
        visibleForm,
        errors,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerUpdatePassword,
        handlerCloseForm,
        getUsers,
    } = useUsers();

    return (
        <UserContext.Provider value={
            {
                users,
                userSelected,
                initialUserForm,
                initialChangePassw,
                visibleForm,
                errors,
                handlerAddUser,
                handlerRemoveUser,
                handlerUserSelectedForm,
                handlerOpenForm,
                handlerUpdatePassword,
                handlerCloseForm,
                getUsers,
            }
        }>
            {children}
        </UserContext.Provider>
    )
}