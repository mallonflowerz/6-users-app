import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import { useAuth } from "../../auth/hooks/useAuth";

export const Navbar = () => {
    const sty = 'background-color: #e3f2fd'

    const { login, handlerLogout } = useAuth();
    return (
        <nav className="navbar navbar-expand-lg  bg-primary" >
            <div className="container-fluid">
                {/* <a className="navbar-brand" href="#">UsersApp</a> */}
                <img src="/flecha.png" alt="SIC Logo fake" height={67} className="px-2" />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" to="/users">
                                <b>Usuarios</b>
                            </NavLink>
                            <ul className="dropdown-menu">
                                <li><NavLink className="dropdown-item" to="#">
                                    Action
                                </NavLink></li>
                                <li><NavLink className="dropdown-item" to="#">
                                    Action
                                </NavLink></li>
                                <li><NavLink className="dropdown-item" to="#">
                                    Action
                                </NavLink></li>
                            </ul>
                        </li>

                        {!login.isAdmin ||
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/users/register">
                                        Registrar Usuario
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/users/changePassword">
                                        Cambiar Contraseña
                                    </NavLink>
                                </li>
                            </>
                        }
                    </ul>
                </div>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNavLogout">
                    <span className="nav-item nav-link text-dark mx-3">
                        <img src="/sin-foto.png" alt="sin-foto" height={45} />
                        <b>{login.user?.username}</b>
                    </span>
                    <button
                        onClick={handlerLogout}
                        className="btn btn-success">
                        <b>Logout</b>
                    </button>
                </div>
            </div>
        </nav>
    );
}