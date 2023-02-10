import React from "react"
import {Link} from "react-router-dom";

const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                <Link to={`user/${user.id}`}>{user.user_name}</Link>
            </td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <div className="section is-medium">
            <p className="title">
                Пользователи TODOS
            </p>
            <p className="subtitle">
                таблица доступных пользователей
            </p>
            <table className="table is-narrow is-fullwidth">
                <thead className="has-background-info-light">
                <th>First name</th>
                <th>Last name</th>
                <th>User Name</th>
                <th>Email</th>
                </thead>
                {users.map((user) => <UserItem user={user}/>)}
            </table>
        </div>
    )
}

export default UserList