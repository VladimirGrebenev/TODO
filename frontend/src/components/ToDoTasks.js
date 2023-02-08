import React from "react"
import {Link} from "react-router-dom";

const ToDoItem = ({todotask, delete_todo}) => {
    return (
        <tr>
            <td>{todotask.id}</td>
            <td>{todotask.project}</td>
            <td>{todotask.description}</td>
            <td>{todotask.created}</td>
            <td>{todotask.updated}</td>
            <td>{todotask.author}</td>
            <td>{todotask.is_done}</td>
            <td>
                <button className='button is-danger' type='button'
                        onClick={() => delete_todo(todotask.id)}>Удалить
                </button>
            </td>
        </tr>
    )
}

const ToDoTasksList = ({todotasks, delete_todo}) => {
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
                <th></th>
                </thead>
                {todotasks.map((todotask)=> <ToDoItem todotask={todotask} delete_todo={delete_todo}/>)}
            </table>
            <Link to='/todos/create'>Создать задачу</Link>
        </div>
    )
}

export default ToDoTasksList