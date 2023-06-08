import { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { usersReducer } from "../reducers/usersReducer";
import { changePassword, findAll, remove, save, update } from "../services/userService";
import { AuthContext } from "../auth/context/AuthContext";

const initialUsers = [];

const initialChangePassw = {
    username: '',
    usernameNew: "",
    password: '',
}

const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
    admin: false,
}

const initialErrors = {
    username: '',
    password: '',
    email: '',
}

const initialErrorsPassw = {
    username: '',
    usernameNew: "",
    password: '',
}

export const useUsers = () => {
    const [users, dispatch] = useReducer(usersReducer, initialUsers);
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const [visibleForm, setVisibleForm] = useState(false);

    const [errors, setErrors] = useState(initialErrors)
    const [errorsPass, setErrorsPass] = useState(initialErrorsPassw)

    const navigate = useNavigate();

    const { login, handlerLogout } = useContext(AuthContext);

    const getUsers = async () => {
        try {
            const result = await findAll();
            console.log(result);
            dispatch({
                type: 'loadingUsers',
                payload: result.data,
            });
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
        // console.log(user);

        if (!login.isAdmin) return;

        let response;
        try {

            if (user.id === 0) {
                response = await save(user);
            } else {
                response = await update(user);
            }

            dispatch({
                type: (user.id === 0) ? 'addUser' : 'updateUser',
                payload: response.data,
            });

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
                setErrors(error.response.data);
            } else if (error.response && error.response.status == 500 &&
                error.response.data?.message?.includes('constraint')) {

                if (error.response.data?.message?.includes('UK_username')) {
                    setErrors({ username: 'El username ya existe!' })
                }
                if (error.response.data?.message?.includes('UK_email')) {
                    setErrors({ email: 'El email ya existe!' })
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

            dispatch({
                type: "changePassw",
                payload: response.data
            })
            navigate('/users');
            Swal.fire(
                "Excelente!",
                "La contraseña se ha cambiado correctamente",
                "success"
            )
            
        } catch (error) {
            if (error.response && error.response.status == 400) {
                setErrorsPass(error.response.data);
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
        // console.log(id);

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
                    dispatch({
                        type: 'removeUser',
                        payload: id,
                    });
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
        // console.log(user)
        setVisibleForm(true);
        setUserSelected({ ...user });
    }

    const handlerOpenForm = () => {
        setVisibleForm(true);
    }

    const handlerCloseForm = () => {
        setVisibleForm(false);
        setUserSelected(initialUserForm);
        setErrors({});
    }
    return {
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
}