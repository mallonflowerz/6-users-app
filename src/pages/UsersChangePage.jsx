import { UserChange } from "../components/UserChange"

export const UsersChangePage = () => {
    return (
        <div className="container my-4"> 
            <h4>Cambie su contraseña o username</h4>
            <div className="row">
                <div className="col">
                    <UserChange />
                </div>
            </div>
        </div>
    )
}