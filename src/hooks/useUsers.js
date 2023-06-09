import { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { changePassword, findAll, remove, save, update } from "../services/userService";
import { AuthContext } from "../auth/context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { initialUserForm, addUsers, changePass, loadingUsers, onCloseForm, onOpenForm, onUserSelectedForm, removeUser, updateUser, loadingError, loadingErrorPass } from "../store/slices/users/usersSlices";

const initialChangePassw = {
    username: '',
    usernameNew: "",
    password: '',
}

export const useUsers = () => {
    const { users } = useSelector(state => state.users)
    const dispatch = useDispatch()

    const navigate = useNavigate();

    const { login, handlerLogout } = useContext(AuthContext);

    const getUsers = async () => {
        try {
            const result = await findAll();
            console.log(result);
            dispatch(loadingUsers(result.data))
        } catch (error) {
            if (error.response?.status == 401) {
                Swal.fire(
                    "Oh no!",
                    "Ha ocurrido un error. Por favor intentar de nuevo",
                    "error"
                )
                handlerLogout();
            }
        }
    }

    const handlerAddUser = async (user) => {

        if (!login.isAdmin) return;

        let response;
        try {

            if (user.id === 0) {
                response = await save(user);
                dispatch(addUsers(response.data))
            } else {
                response = await update(user);
                dispatch(updateUser(response.data))
            }

            Swal.fire(
                (user.id === 0) ?
                    'Usuario Creado' :
                    'Usuario Actualizado',
                (user.id === 0) ?
                    'El usuario ha sido creado con exito!' :
                    'El usuario ha sido actualizado con exito!',
                'success'
            );
            handlerCloseForm();
            navigate('/users');
        } catch (error) {
            if (error.response && error.response.status == 400) {
                dispatch(loadingError(error.response.data))
            } else if (error.response && error.response.status == 500 &&
                error.response.data?.message?.includes('constraint')) {

                if (error.response.data?.message?.includes('UK_username')) {
                    dispatch(loadingError({ username: 'El username ya existe!' }))
                }
                if (error.response.data?.message?.includes('UK_email')) {
                    dispatch(loadingError({ email: 'El email ya existe!' }))
                }
            } else if (error.response?.status == 401) {
                Swal.fire(
                    "Sesion expirada",
                    "La sesion ha expirado debido a un error interno, inicie sesion nuevamente",
                    "info"
                )
                handlerLogout();
            } else {
                throw error;
            }
        }
    }

    const handlerUpdatePassword = async (user) => {
        if (!login.isAdmin) return;

        let response;
        try {
            response = await changePassword(user)
            dispatch(changePass(response.data))
            navigate('/users');
            Swal.fire(
                "Excelente!",
                "La contraseña se ha cambiado correctamente",
                "success"
            )

        } catch (error) {
            if (error.response && error.response.status == 400) {
                dispatch(loadingErrorPass((error.response.data)));
            } else if (error.response?.status == 401) {
                Swal.fire(
                    "Sesion expirada",
                    "La sesion ha expirado debido a un error interno, inicie sesion nuevamente",
                    "info"
                )
                handlerLogout();
            } else {
                throw error;
            }
        }
    }

    const handlerRemoveUser = (id) => {

        if (!login.isAdmin) return;

        Swal.fire({
            title: 'Esta seguro que desea eliminar?',
            text: "Cuidado el usuario sera eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await remove(id);
                    dispatch(removeUser(id))
                    Swal.fire(
                        'Usuario Eliminado!',
                        'El usuario ha sido eliminado con exito!',
                        'success'
                    );
                } catch (error) {
                    if (error.response?.status == 401) {
                        Swal.fire(
                            "Sesion expirada",
                            "La sesion ha expirado debido a un error interno, inicie sesion nuevamente",
                            "info"
                        )
                        handlerLogout();
                    }
                }
            }
        })

    }

    const handlerUserSelectedForm = (user) => {
        dispatch(onUserSelectedForm({ ...user }))
    }

    const handlerOpenForm = () => {
        dispatch(onOpenForm())
    }

    const handlerCloseForm = () => {
        dispatch(onCloseForm())
        dispatch(loadingError({}));
    }
    return {
        users,
        userSelected,
        initialUserForm,
        initialChangePassw,
        visibleForm,
        errors,
        errorsPass,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerUpdatePassword,
        handlerCloseForm,
        getUsers,
    } 
}