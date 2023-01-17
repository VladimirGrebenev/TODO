import React from "react"

const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.user_name}</td>
            <td>{user.email}</td>
            <td>{user.date_joined}</td>
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
                <th>Date joined</th>
                </thead>
                {users.map((user) => <UserItem user={user}/>)}
            </table>
        </div>
    )
}

export default UserList