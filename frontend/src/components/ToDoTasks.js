import React from "react"

const ToDoItem = ({todotask}) => {
    return (
        <tr>
            <td>{todotask.id}</td>
            <td>{todotask.project}</td>
            <td>{todotask.description}</td>
            <td>{todotask.created}</td>
            <td>{todotask.updated}</td>
            <td>{todotask.author}</td>
            <td>{todotask.is_done}</td>
        </tr>
    )
}

const ToDoTasksList = ({todotasks}) => {
    return (
        <div className="section is-medium">
            <p className="title">
                Список задач
            </p>
            <p className="subtitle">
                таблица доступных задач
            </p>
            <table className="table is-narrow is-fullwidth">
                <thead className="has-background-info-light">
                <th>ID задачи</th>
                <th>Проект</th>
                <th>Задача</th>
                <th>Создана</th>
                <th>Обновлена</th>
                <th>Автор</th>
                <th>Выполнено</th>
                </thead>
                {todotasks.map((todotask)=> <ToDoItem todotask={todotask}/>)}
            </table>
        </div>
    )
}

export default ToDoTasksList