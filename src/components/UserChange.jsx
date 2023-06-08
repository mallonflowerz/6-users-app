import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export const UserChange = () => {
    const { initialChangePassw, handlerUpdatePassword, errors } = useContext(UserContext);

    const [userForm, setUserForm] = useState(initialChangePassw);
    const { username, usernameNew, password } = userForm;

    const onInputChange = ({ target }) => {
        // console.log(target.value)
        const { name, value } = target;
        setUserForm({
            ...userForm,
            [name]: value,
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        handlerUpdatePassword(userForm);
        setUserForm(initialChangePassw);
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                className="form-control my-3 w-75"
                placeholder="Username a cambiar"
                name="username"
                value={username}
                onChange={onInputChange} />
            <p className="text-danger">{errors?.username}</p>

            <input
                className="form-control my-3 w-75"
                placeholder="Username nuevo"
                name="usernameNew"
                value={usernameNew}
                onChange={onInputChange} />
            <p className="text-danger">{errors?.usernameNew}</p>

            <input
                className="form-control my-3 w-75"
                placeholder="Password nuevo"
                type="password"
                name="password"
                value={password}
                onChange={onInputChange} />
            <p className="text-danger">{errors?.password}</p>

            <button
                className="btn btn-primary"
                type="submit">
                Editar
            </button>
        </form>
    )


}